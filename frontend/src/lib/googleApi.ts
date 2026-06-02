export interface GoogleFitStatus {
  connected: boolean;
  message: string;
  stepsCountToday?: number;
  lastFetchedAt?: string;
  error?: string;
}

export async function checkGoogleFitConnection(): Promise<GoogleFitStatus> {
    const token = (window as any).__google_access_token__ || localStorage.getItem('google_access_token');
    if (!token) {
        return {
            connected: false,
            message: 'Google Fit disconnected. Sign in with Google to enable.'
        };
    }

    try {
        const steps = await getGoogleFitSteps();
        return {
            connected: true,
            message: 'Connected and synchronized',
            stepsCountToday: steps,
            lastFetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
    } catch (e: any) {
        console.error('Google Fit Connection Error:', e);
        const errorMsg = e.message || String(e);
        let customMessage = 'Session or token invalid. Please sign out and sign in again.';
        if (errorMsg.includes('Fitness API') || errorMsg.includes('403')) {
            customMessage = 'Google Fit API is disabled. Action required in Google Cloud Console.';
        }
        return {
            connected: false,
            message: customMessage,
            error: errorMsg
        };
    }
}

export async function getGoogleFitSteps(): Promise<number> {
    const token = (window as any).__google_access_token__ || localStorage.getItem('google_access_token');
    if (!token) {
        console.warn('No Google access token found. Please sign in with Google directly to sync steps.');
        return 0;
    }

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfDay = now.getTime();

    let res;
    try {
        res = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "aggregateBy": [{
                    "dataTypeName": "com.google.step_count.delta",
                }],
                "bucketByTime": { "durationMillis": 86400000 },
                "startTimeMillis": startOfDay,
                "endTimeMillis": endOfDay
            })
        });
    } catch (networkError: any) {
        console.error('Core Network/CORS Fetch Error for Google Fit:', networkError);
        // Do not throw generic 'Failed to fetch', give actionable instruction
        throw new Error('Connection failed: Network request blocked or Google Fit token invalid/expired. Please sign out and sign in with Google to refresh permissions.');
    }

    if (!res.ok) {
        // Self-heal: If token is unauthorized (401), remove it so the user can re-authenticate.
        // Keep 403 Forbidden so the user can see the exact GCP project/registration link to enable the API.
        if (res.status === 401) {
            console.warn(`Google Fit token rejected with status ${res.status}. Removing stale credentials.`);
            localStorage.removeItem('google_access_token');
            if ((window as any).__google_access_token__) {
                delete (window as any).__google_access_token__;
            }
        }

        let errorDetail = '';
        try {
            const errData = await res.json();
            if (errData && errData.error && errData.error.message) {
                errorDetail = errData.error.message;
            } else {
                errorDetail = JSON.stringify(errData);
            }
        } catch {
            try {
                errorDetail = await res.text();
            } catch {
                errorDetail = res.statusText || `HTTP ${res.status}`;
            }
        }
        throw new Error(`Google Fit API error (${res.status}): ${errorDetail || 'Access Token Rejected'}`);
    }

    const data = await res.json();
    let totalSteps = 0;
    if (data.bucket && data.bucket.length > 0) {
      data.bucket.forEach((b: any) => {
        if (b.dataset && b.dataset.length > 0) {
          b.dataset.forEach((d: any) => {
            if (d.point && d.point.length > 0) {
              d.point.forEach((p: any) => {
                if (p.value && p.value.length > 0) {
                  totalSteps += p.value[0].intVal || 0;
                }
              });
            }
          });
        }
      });
    }
    return totalSteps;
}

export async function addWorkoutToCalendarAndTasks(planName: string, dayName: string, exercises: any[]) {
    const token = (window as any).__google_access_token__ || localStorage.getItem('google_access_token');
    if (!token) {
        throw new Error('No Google access token found. Please sign out and sign in with Google directly to reconnect.');
    }

    const desc = exercises.map(ex => `${ex.name}: ${ex.sets} sets x ${ex.reps} | Rest: ${ex.restSeconds}s`).join('\n');

    // Create a task
    const taskRes = await fetch('https://tasks.googleapis.com/tasks/v1/lists/@default/tasks', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: `Workout: ${planName} - ${dayName}`,
            notes: desc,
            due: new Date().toISOString()
        })
    });
    
    if (!taskRes.ok) {
        const err = await taskRes.text();
        throw new Error('Failed to create task: ' + err);
    }

    // Create an event
    const startTime = new Date();
    startTime.setHours(startTime.getHours() + 1);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const eventRes = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            summary: `🏋️ ${planName} : ${dayName}`,
            description: desc,
            start: {
                dateTime: startTime.toISOString(),
            },
            end: {
                dateTime: endTime.toISOString(),
            }
        })
    });

    if (!eventRes.ok) {
        const err = await eventRes.text();
        throw new Error('Failed to create event: ' + err);
    }
}
