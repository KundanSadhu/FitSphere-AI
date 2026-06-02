import { User, WorkoutPlan, DietPlan, Challenge, Post, Product } from './types';

export const INITIAL_USER: User = {
  id: 'user_01',
  name: 'Kundan Saduyashwanth',
  email: 'kundansaduyashwanth@gmail.com',
  role: 'client',
  photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
  streak: 5,
  level: 4,
  points: 450,
  xp: 1250,
  targetXp: 3000,
  onboardingCompleted: true
};

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'wp_advanced_strength',
    name: 'Advanced Strength Powerlifting',
    goal: 'Maximize 1RM capacity across compound lifts',
    difficulty: 'Advanced',
    durationWeeks: 12,
    days: [
      {
        dayName: 'Day 1 — Heavy Push',
        exercises: [
          {
            name: 'Barbell Bench Press', sets: 5, reps: '3-5', restSeconds: 180, videoUrl: 'https://www.youtube.com/watch?v=vcBig73ojpE', notes: 'Arch lower back, drive through legs.', muscleGroup: 'Chest',
            steps: ['Lie back on the flat bench.', 'Grip the bar slightly wider than shoulder-width.', 'Lower the bar to your mid-chest.', 'Press upwards forcefully.'],
            precautions: ['Do not bounce the bar off your chest.', 'Ensure you have a spotter.'],
            tips: ['Keep your shoulder blades retracted.', 'Use leg drive by planting your feet firmly.']
          },
          {
            name: 'Overhead Press', sets: 4, reps: '4-6', restSeconds: 150, videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZAHDI', notes: 'Brace core, push head through at the top.', muscleGroup: 'Shoulders',
            steps: ['Stand with the bar on your front shoulders.', 'Press the bar straight up.', 'Push your head forward slightly at the top.', 'Lower it under control.'],
            precautions: ['Do not lean back excessively.', 'Avoid using your legs (strict press).'],
            tips: ['Squeeze your glutes to protect your lower back.', 'Grip the bar tightly.']
          },
          {
            name: 'Close-Grip Bench Press', sets: 3, reps: '8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=nEF0bv2FW94', notes: 'Keep elbows tucked for triceps focus.', muscleGroup: 'Triceps',
            steps: ['Grip the bar at shoulder-width.', 'Lower the bar to your lower chest.', 'Keep elbows close to your torso.', 'Press back to the start.'],
            precautions: ['Do not grip too close; it strains the wrists.', 'Ensure proper shoulder warm-up.'],
            tips: ['Focus on pushing with your triceps.', 'Control the eccentric phase.']
          },
          {
            name: 'Dumbbell Flyes', sets: 3, reps: '10-12', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0', notes: 'Stretch the chest muscles.', muscleGroup: 'Chest',
            steps: ['Lie on a bench with dumbbells over your chest.', 'Lower weights in a wide arc.', 'Feel a stretch in your chest.', 'Bring weights back up, hugging a barrel.'],
            precautions: ['Do not lower the weights too deep (shoulder strain).', 'Keep a slight bend in your elbows.'],
            tips: ['Focus on the stretch, not the weight.', 'Squeeze pecs at the top.']
          }
        ]
      },
      {
        dayName: 'Day 2 — Heavy Pull',
        exercises: [
          {
            name: 'Deadlift', sets: 5, reps: '3-5', restSeconds: 180, videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE', notes: 'Neutral spine, drive hips forward.', muscleGroup: 'Back',
            steps: ['Stand with mid-foot under the bar.', 'Grab the bar without bending your legs.', 'Bend your knees until shins touch the bar.', 'Lift your chest and pull.'],
            precautions: ['Never round your lower back.', 'Do not jerk the weight off the floor.'],
            tips: ['Keep the bar in contact with your legs.', 'Push the floor away with your feet.']
          },
          {
            name: 'Barbell Rows', sets: 4, reps: '6-8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=9efgcAjQe7E', notes: 'Pull to the lower chest/upper stomach.', muscleGroup: 'Back',
            steps: ['Bend over holding the bar with a pronated grip.', 'Keep your back straight and parallel to the floor.', 'Pull the bar to your lower rib cage.', 'Lower it slowly.'],
            precautions: ['Do not use momentum by swinging.', 'Keep your neck neutral.'],
            tips: ['Squeeze your shoulder blades together.', 'Pull with your elbows.']
          },
          {
            name: 'Pull-Ups', sets: 4, reps: 'To Failure', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=eGo4IYONKTI', notes: 'Full range of motion.', muscleGroup: 'Back',
            steps: ['Hang from the bar with hands slightly wider than shoulders.', 'Pull yourself up until your chin clears the bar.', 'Lower yourself all the way down.'],
            precautions: ['Avoid kipping or swinging if aiming for strict form.', 'Do not half-rep.'],
            tips: ['Engage your lats from the start.', 'Cross your legs to prevent swinging.']
          },
          {
            name: 'Barbell Curls', sets: 3, reps: '8-10', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo', notes: 'Strict form, no swinging.', muscleGroup: 'Biceps',
            steps: ['Hold the bar with a supinated grip.', 'Curl the bar up towards your chest.', 'Squeeze the biceps at the top.', 'Lower the weight slowly.'],
            precautions: ['Do not lean back.', 'Keep elbows pinned to your sides.'],
            tips: ['Use an EZ bar if straight bar hurts your wrists.', 'Focus on the negative.']
          }
        ]
      },
      {
        dayName: 'Day 3 — Heavy Legs',
        exercises: [
          {
            name: 'Low Bar Squat', sets: 5, reps: '3-5', restSeconds: 180, videoUrl: 'https://www.youtube.com/watch?v=bEv6CCg2BC8', notes: 'Sit back into the squat, keep chest up.', muscleGroup: 'Quads',
            steps: ['Place the bar across your rear delts.', 'Step back and set your feet.', 'Squat down until hips are below knees.', 'Drive upwards.'],
            precautions: ['Do not let your knees cave in.', 'Maintain a neutral spine.'],
            tips: ['Take a deep breath and brace your core.', 'Drive your upper back into the bar.']
          },
          {
            name: 'Front Squat', sets: 4, reps: '6-8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=uYumuL_G_V0', notes: 'Keep elbows high.', muscleGroup: 'Quads',
            steps: ['Rest the bar on your front delts.', 'Keep your elbows up high.', 'Squat down maintaining an upright torso.', 'Stand back up.'],
            precautions: ['If your elbows drop, you will drop the bar.', 'Do not lean forward.'],
            tips: ['Cross your arms if wrist flexibility is an issue.', 'Focus strongly on keeping the chest tall.']
          },
          {
            name: 'Romanian Deadlift', sets: 4, reps: '8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=JCXUYuzwNrM', notes: 'Push hips back, feel hamstring stretch.', muscleGroup: 'Hamstrings',
            steps: ['Hold the bar at hip level.', 'Push your hips back as far as possible.', 'Lower the bar just below your knees.', 'Squeeze glutes to return to the start.'],
            precautions: ['Do not round your lower back.', 'Keep the bar close to your legs.'],
            tips: ['Keep a slight bend in your knees.', 'Think of your hips as a hinge.']
          },
          {
            name: 'Calf Raises', sets: 4, reps: '15-20', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=-M4-G8p8fmc', notes: 'Full stretch at the bottom.', muscleGroup: 'Calves',
            steps: ['Stand on the edge of a step.', 'Let your heels drop down for a stretch.', 'Push up onto your toes.', 'Hold for a second at the top.'],
            precautions: ['Do not bounce at the bottom.', 'Ensure you have a good balance.'],
            tips: ['Perform the reps slowly.', 'Focus on maximum contraction.']
          }
        ]
      }
    ]
  },
  {
    id: 'wp_hiit_fat_burn',
    name: 'HIIT Fat Burner Accelerator',
    goal: 'Maximize calorie expenditure and cardiovascular endurance',
    difficulty: 'Intermediate',
    durationWeeks: 4,
    days: [
      {
        dayName: 'Day 1 — Full Body Explosive',
        exercises: [
          {
            name: 'Burpees', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU', notes: 'Jump as high as possible.', muscleGroup: 'Full Body',
            steps: ['Start in a standing position.', 'Drop into a squat position and place your hands on the ground.', 'Kick your feet back to a plank position.', 'Return your feet to the squat position and jump up.'],
            precautions: ['Pace yourself; do not burn out on the first set.', 'Protect your lower back during the plank.'],
            tips: ['Breathe rhythmically.', 'Add a push-up for extra difficulty.']
          },
          {
            name: 'Kettlebell Swings', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=YSxHifyI6s8', notes: 'Hinge at the hips, propel with glutes.', muscleGroup: 'Hamstrings',
            steps: ['Stand with feet slightly wider than shoulder-width.', 'Hinge at your hips and grab the kettlebell.', 'Swing it back between your legs.', 'Drive your hips forward to swing it up.'],
            precautions: ['Do not use your arms to lift the weight; use momentum.', 'Keep your back flat.'],
            tips: ['Squeeze your glutes hard at the top.', 'Keep your core engaged.']
          },
          {
            name: 'Mountain Climbers', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM', notes: 'Keep core tight, move fast.', muscleGroup: 'Core',
            steps: ['Start in a high plank position.', 'Bring one knee towards your chest.', 'Quickly switch legs.', 'Continue alternating legs rapidly.'],
            precautions: ['Do not let your hips bounce up and down.', 'Keep your shoulders over your wrists.'],
            tips: ['Focus on speed while maintaining core stability.', 'Look slightly ahead, not directly down.']
          },
          {
            name: 'Box Jumps', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=52r_Ul5k03g', notes: 'Land softly, step down.', muscleGroup: 'Legs',
            steps: ['Stand in front of a plyo box.', 'Bend your knees and swing your arms back.', 'Jump explosively onto the box.', 'Land softly with knees slightly bent.', 'Step down (don\'t jump down).'],
            precautions: ['Never jump down backwards; it risks Achilles injury.', 'Ensure the box is sturdy.'],
            tips: ['Use your arms for momentum.', 'Focus on landing softly like a ninja.']
          }
        ]
      },
      {
        dayName: 'Day 2 — Core & Cardio',
        exercises: [
          {
            name: 'Jump Rope', sets: 5, reps: '60s work', restSeconds: 20, videoUrl: 'https://www.youtube.com/watch?v=FJmRQ5iTXCE', notes: 'Stay low to the ground.', muscleGroup: 'Cardio',
            steps: ['Hold the rope handles firmly.', 'Swing the rope over your head.', 'Jump slightly as the rope passes under your feet.', 'Establish a steady rhythm.'],
            precautions: ['Ensure you have enough ceiling clearance.', 'Wear supportive shoes.'],
            tips: ['Keep your jumps close to the ground.', 'Let your wrists do the work, not your arms.']
          },
          {
            name: 'Russian Twists', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI', notes: 'Twist torso fully.', muscleGroup: 'Core',
            steps: ['Sit on the floor with your knees bent.', 'Lean back slightly, keeping your back straight.', 'Hold a weight or medicine ball.', 'Twist your torso to the right, then to the left.'],
            precautions: ['Do not hunch your back.', 'Control the movement; do not just swing the weight.'],
            tips: ['Follow the weight with your eyes.', 'Elevate your feet to increase difficulty.']
          },
          {
            name: 'Bicycle Crunches', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8', notes: 'Elbow to opposite knee.', muscleGroup: 'Core',
            steps: ['Lie flat on your back with hands behind your head.', 'Lift your legs off the ground.', 'Bring your right elbow towards your left knee.', 'Switch sides, mimicking a pedaling motion.'],
            precautions: ['Do not pull on your neck.', 'Avoid rushing the movement.'],
            tips: ['Focus on the twist in your abs.', 'Fully extend the non-bending leg.']
          },
          {
            name: 'High Knees', sets: 4, reps: '45s work', restSeconds: 15, videoUrl: 'https://www.youtube.com/watch?v=ZZb_XhXEcZk', notes: 'Drive knees up above waist.', muscleGroup: 'Cardio',
            steps: ['Stand tall with your core engaged.', 'Run in place, driving your knees as high as possible.', 'Pump your arms in synchronization.', 'Land on the balls of your feet.'],
            precautions: ['Avoid leaning back too far.', 'Do not slam your heels down.'],
            tips: ['Keep your chest up.', 'Aim for speed and maximum knee height.']
          }
        ]
      }
    ]
  },
  {
    id: 'wp_calisthenics_mastery',
    name: 'Bodyweight Calisthenics Mastery',
    goal: 'Attain elite body control, relative strength, and balance',
    difficulty: 'Advanced',
    durationWeeks: 10,
    days: [
      {
        dayName: 'Day 1 — Upper Body Dynamics',
        exercises: [
          {
            name: 'Muscle-Ups', sets: 5, reps: '3-5', restSeconds: 150, videoUrl: 'https://www.youtube.com/watch?v=4E-1E4LzWb4', notes: 'False grip, explosive pull.', muscleGroup: 'Full Body',
            steps: ['Hang from the rings or bar with a false grip.', 'Perform an explosive pull-up.', 'Transition your chest over the bar/rings.', 'Press up to complete the movement.'],
            precautions: ['Risk of shoulder and elbow injury if done without proper strength.', 'Avoid extreme swinging (kipping).'],
            tips: ['Master the false grip first.', 'Practice explosive pull-ups to chest height.']
          },
          {
            name: 'Handstand Push-Ups', sets: 4, reps: '5-8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=h0JlvE_6Pbs', notes: 'Control the descent, brace core.', muscleGroup: 'Shoulders',
            steps: ['Kick up into a handstand against a wall.', 'Slowly lower yourself until your head lightly touches the floor.', 'Press back up until arms are fully extended.'],
            precautions: ['Do not crash your head on the floor.', 'Requires significant shoulder strength and mobility.'],
            tips: ['Keep your core very tight.', 'Point your toes towards the ceiling.']
          },
          {
            name: 'Front Lever Holds', sets: 4, reps: '10s', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=hynJ1qJiv78', notes: 'Retract scapula, straight body.', muscleGroup: 'Back',
            steps: ['Hang from the bar.', 'Engage your lats and core tightly.', 'Raise your whole body until it is horizontal to the ground.', 'Hold the position.'],
            precautions: ['High stress on the lower back and shoulder joints.', 'Don\'t attempt full lever without mastering tuck progressions.'],
            tips: ['Squeeze your glutes and point your toes.', 'Keep your arms completely straight.']
          },
          {
            name: 'Pistol Squats', sets: 3, reps: '5/leg', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=qDcniqdtTeE', notes: 'Balance on one leg, descend fully.', muscleGroup: 'Legs',
            steps: ['Stand on one leg, extending the other straight out.', 'Squat all the way down on the standing leg.', 'Keep the heel of the standing leg on the floor.', 'Stand back up.'],
            precautions: ['Can be harsh on the knee joint if ankle mobility is lacking.', 'Avoid letting your knee cave inwards.'],
            tips: ['Hold a light counterweight out front for balance.', 'Use a box or bench for assistance initially.']
          }
        ]
      }
    ]
  },
  {
    id: 'wp_shred',
    name: '3D Hypertrophy & Shred',
    goal: 'Build muscle size and define body shape with aesthetic precision',
    difficulty: 'Intermediate',
    durationWeeks: 6,
    days: [
      {
        dayName: 'Day 1 — Upper Body Aesthetics',
        exercises: [
          {
            name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=0G2_XP7VyG8', notes: 'Focus on maximum chest squeeze at the top and slow control down.', muscleGroup: 'Chest',
            steps: ['Set the bench to a 30-45 degree incline.', 'Press dumbbells straight up above shoulders.', 'Lower them slowly until you feel a chest stretch.', 'Press back up and squeeze pecs.'],
            precautions: ['Do not set the incline too steep (overworks shoulders).', 'Keep your elbows slightly tucked.'],
            tips: ['Bring dumbbells together at the top, but do not clink them.', 'Arch your upper back slightly.']
          },
          {
            name: 'Lat Pulldowns (Wide-grip)', sets: 4, reps: '10-12', restSeconds: 75, videoUrl: 'https://www.youtube.com/watch?v=SALxVKVe9zo', notes: 'Pull with your elbows, keep chest high, feel the lats widen.', muscleGroup: 'Back',
            steps: ['Sit down and grip the bar widely.', 'Lean back slightly.', 'Pull the bar down to your upper chest.', 'Slowly let it return to the top.'],
            precautions: ['Do not pull behind your neck (rotator cuff risk).', 'Avoid excessive swinging.'],
            tips: ['Imagine pulling your elbows down to your pockets.', 'Squeeze your lats at the bottom.']
          },
          {
            name: 'Dumbbell Lateral Raises', sets: 4, reps: '15-20', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=WJm9zA36co0', notes: 'Tilt pinkies up slightly. Control the negative — do not swing!', muscleGroup: 'Shoulders',
            steps: ['Stand straight holding dumbbells at your sides.', 'Raise arms out to the sides until parallel with the floor.', 'Lower them slowly back to your sides.'],
            precautions: ['Do not raise weights above shoulder height.', 'Do not use your hips to swing the weight up.'],
            tips: ['Keep a slight bend in your elbows.', 'Lead with your elbows, not your hands.']
          },
          {
            name: 'Incline Dumbbell Bicep Curl', sets: 3, reps: '10-12', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=soxrdi1qS88', notes: 'Sit on a 45-degree decline to fully stretch the long bicep head.', muscleGroup: 'Biceps',
            steps: ['Sit on an incline bench with dumbbells hanging straight down.', 'Curl the weights up while keeping your upper arms stationary.', 'Lower back down fully.'],
            precautions: ['Do not let your shoulders roll forward.', 'Avoid swinging the dumbbells.'],
            tips: ['Supinate (twist) your wrists outwards at the top.', 'Focus on the deep stretch at the bottom.']
          },
          {
            name: 'Tricep Rope Overhead Press', sets: 3, reps: '12-15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=ns-WG95H14I', notes: 'Keep elbows tucked near your temples to isolate the long head.', muscleGroup: 'Triceps',
            steps: ['Attach a rope to a low or mid pulley.', 'Turn away from the machine, holding the rope behind your head.', 'Extend your arms straight up.', 'Lower back behind your head.'],
            precautions: ['Keep your core tight so your back does not arch excessively.', 'Keep elbows pointing up, not flaring out.'],
            tips: ['Spread the rope apart at the top.', 'Control the eccentric phase.']
          }
        ]
      },
      {
        dayName: 'Day 2 — Quad & Calf Focus',
        exercises: [
          {
            name: 'Barbell Back Squats', sets: 4, reps: '6-8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=ultWZbUM_s8', notes: 'Explode up from the parallel state. Maintain core tightness.', muscleGroup: 'Quads',
            steps: ['Unrack the barbell across your upper traps or rear delts.', 'Squat down until thighs are at least parallel to the floor.', 'Drive forcefully upwards.'],
            precautions: ['Do not lift with your lower back.', 'Ensure knees track in the same direction as your toes.'],
            tips: ['Keep your chest up and look straight ahead.', 'Push evenly through your whole foot.']
          },
          {
            name: 'Walking Dumbbell Lunges', sets: 3, reps: '12 steps/leg', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=D7KaRcUTQeE', notes: 'Step forward deliberately, lowering until back knee almost grazes mat.', muscleGroup: 'Quads',
            steps: ['Hold dumbbells at your sides.', 'Take a large step forward.', 'Lower your hips until both knees are bent at a 90-degree angle.', 'Push off the front foot to take the next step.'],
            precautions: ['Do not let your front knee extend far past your toes.', 'Keep your torso upright.'],
            tips: ['Focus on pushing through the front heel.', 'Take wide enough steps to engage glutes and quads evenly.']
          },
          {
            name: 'Standing Calf Raises', sets: 4, reps: '15-20', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=N3_v6xO_P6Q', notes: 'Pause at the peak concentric contraction and hold for 1 second.', muscleGroup: 'Calves',
            steps: ['Stand on the edge of a step or calf machine.', 'Lower your heels to feel a stretch.', 'Push up onto your toes forcefully.', 'Squeeze the calves hard at the top.'],
            precautions: ['Do not bounce quickly; it uses tendons instead of muscle.', 'Don\'t bend your knees excessively.'],
            tips: ['Hold the stretch at the bottom for 2 seconds.', 'Hold the squeeze at the top for 1 second.']
          }
        ]
      },
      {
        dayName: 'Day 3 — Back Posterior & Core',
        exercises: [
          {
            name: 'Conventional Barbell Deadlifts', sets: 3, reps: '5', restSeconds: 150, videoUrl: 'https://www.youtube.com/watch?v=op9kVnSyy6I', notes: 'Power through the feet, keep the bar scraping close to your shins.', muscleGroup: 'Back',
            steps: ['Setup with the bar over your mid-foot.', 'Grip the bar, bend knees until shins touch it.', 'Lift your chest, brace your core.', 'Stand up by pushing through the floor.'],
            precautions: ['Never let your lower back round.', 'Do not try to squat the weight up.'],
            tips: ['Take the slack out of the bar before you lift.', 'Engage lats by squeezing imaginary oranges in your armpits.']
          },
          {
            name: 'Hanging Leg Raises', sets: 3, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=3RnyNHe9s04', notes: 'Raise legs to parallel or higher without using body momentum.', muscleGroup: 'Core',
            steps: ['Hang from a pull-up bar.', 'Keep legs straight.', 'Raise your legs until they form a 90-degree angle with your torso.', 'Lower them slowly.'],
            precautions: ['Do not swing your body to generate momentum.', 'Stop if you feel lower back pain.'],
            tips: ['Focus on tilting your pelvis up.', 'Squeeze your abs hard at the top.']
          },
          {
            name: 'Plank Hold (Max Duration)', sets: 3, reps: '60s-90s', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw', notes: 'Squeeze glutes, push floor away through elbows, keep straight spine.', muscleGroup: 'Core',
            steps: ['Rest on your forearms and toes.', 'Ensure your body forms a straight line from head to heels.', 'Brace your core and squeeze your glutes.', 'Hold for the required time.'],
            precautions: ['Do not let your hips sag down.', 'Do not pike your hips up in the air.'],
            tips: ['Actively pull your elbows towards your toes to engage more core.', 'Breathe consistently.']
          }
        ]
      }
    ]
  },
  {
    id: 'wp_beg_gain',
    name: 'Beginner Aesthetic Foundation',
    goal: 'Set perfect fundamental movements and initial strength adaptations',
    difficulty: 'Beginner',
    durationWeeks: 8,
    days: [
      {
        dayName: 'Day 1 — Full Body Push & Pull',
        exercises: [
          {
            name: 'Goblet Squat', sets: 3, reps: '10-12', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=mC6g8588048', notes: 'Hold kettlebell/dumbbell close to your collarbones. Push through heels.', muscleGroup: 'Quads',
            steps: ['Hold a dumbbell or kettlebell vertically against your chest.', 'Stand with feet shoulder-width apart.', 'Squat down keeping chest tall.', 'Push back up to the start.'],
            precautions: ['Do not lean forward excessively.', 'Keep your knees tracking over your toes.'],
            tips: ['Sit back as if you are sitting into a chair.', 'Use your elbows to push your knees out slightly at the bottom.']
          },
          {
            name: 'Push-Ups (Standard or Incline)', sets: 3, reps: '8-12', restSeconds: 75, videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', notes: 'Lower body as a solid unit. Squeeze chest on the way up.', muscleGroup: 'Chest',
            steps: ['Position hands slightly wider than shoulders.', 'Keep your body completely straight.', 'Lower until your chest almost touches the floor/surface.', 'Push back up forcefully.'],
            precautions: ['Do not flare your elbows out 90 degrees.', 'Do not let your hips sag.'],
            tips: ['Keep your elbows tucked at roughly a 45-degree angle.', 'Use an elevated surface (like a bench) if standard is too hard.']
          },
          {
            name: 'Bent-Over Dumbbell Row', sets: 3, reps: '10', restSeconds: 75, videoUrl: 'https://www.youtube.com/watch?v=6g8eJ_of_S4', notes: 'Keep back flat parallel to the ground. Drive elbows back.', muscleGroup: 'Back',
            steps: ['Place one knee and hand on a bench.', 'Hold a dumbbell in the other hand.', 'Pull the dumbbell up towards your hip.', 'Lower it slowly under control.'],
            precautions: ['Do not twist your torso excessively.', 'Avoid rounding your lower back.'],
            tips: ['Pull with your elbow, not your hand.', 'Keep your shoulder retracted.']
          }
        ]
      }
    ]
  }
,
  {
    id: 'wp_7_day_ultimate',
    name: '7-Day Ultimate Split',
    goal: 'Complete muscular development with a dedicated day for each major muscle group.',
    difficulty: 'Intermediate',
    durationWeeks: 8,
    days: [
      {
        dayName: 'Day 1 — Chest Day',
        exercises: [
          {
            name: 'Barbell Bench Press', sets: 4, reps: '8-10', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=vcBig73ojpE', notes: 'Keep feet planted and back slightly arched.', muscleGroup: 'Chest',
            steps: ['Lie flat on bench.', 'Grip bar slightly wider than shoulders.', 'Lower to mid-chest.', 'Drive up forcefully.'], precautions: ['Use a spotter.', 'Don\'t bounce off chest.'], tips: ['Squeeze glutes.', 'Retract scapula.']
          },
          {
            name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=0G2_XP7VyG8', notes: 'Focus on upper chest contraction.', muscleGroup: 'Chest',
            steps: ['Set bench to 30 degrees.', 'Press dumbbells up over eyes.', 'Lower to an inch above chest.', 'Press up and squeeze.'], precautions: ['Don\'t go too heavy, protect shoulders.'], tips: ['Pause at the bottom.', 'Squeeze at top.']
          },
          {
            name: 'Cable Crossovers', sets: 3, reps: '12-15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=taI4XduLpTk', notes: 'Great for inner chest definition.', muscleGroup: 'Chest',
            steps: ['Stand in center of pulleys.', 'Grab handles, step forward to stagger stance.', 'Bring hands together describing an arc.', 'Slowly return to start.'], precautions: ['Don\'t let weight pull arms too far back.'], tips: ['Keep elbows slightly bent.', 'Flex pecs hard at the peak.']
          },
          {
            name: 'Pec Deck Machine', sets: 3, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=k4T0hU3T2Dk', notes: 'Isolate the chest with constant tension.', muscleGroup: 'Chest',
            steps: ['Sit with back flat against pad.', 'Grip handles at chest height.', 'Bring arms together in front of you.', 'Return slowly.'], precautions: ['Keep shoulders down against pad.'], tips: ['Focus entirely on chest squeeze.']
          }
        ]
      },
      {
        dayName: 'Day 2 — Back Day',
        exercises: [
          {
            name: 'Deadlift', sets: 4, reps: '5-8', restSeconds: 180, videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE', notes: 'King of back exercises. Protect your spine.', muscleGroup: 'Back',
            steps: ['Stand mid-foot under bar.', 'Bend and grip bar outside knees.', 'Chest up, back flat.', 'Pull by driving heels into floor.'], precautions: ['Never round lower back.', 'Keep bar close to body.'], tips: ['Push floor away.', 'Engage lats before pulling.']
          },
          {
            name: 'Lat Pulldown', sets: 4, reps: '10-12', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=SALxVKVe9zo', notes: 'Build back width.', muscleGroup: 'Back',
            steps: ['Grip bar wide.', 'Sit securely under thigh pads.', 'Pull bar to upper chest.', 'Control the ascent.'], precautions: ['Don\'t pull behind the neck.'], tips: ['Lead with elbows.', 'Arch back slightly.']
          },
          {
            name: 'Seated Cable Row', sets: 3, reps: '12', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74', notes: 'Builds back thickness.', muscleGroup: 'Back',
            steps: ['Sit with knees slightly bent.', 'Grip the V-bar.', 'Pull handle to stomach.', 'Stretch forward slowly.'], precautions: ['Don\'t swing your torso to move weight.'], tips: ['Squeeze shoulder blades together.', 'Keep chest puffed out.']
          },
          {
            name: 'Single Arm Dumbbell Row', sets: 3, reps: '10-12 / arm', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=pYcpY20QaE8', notes: 'Unilateral focus for lats.', muscleGroup: 'Back',
            steps: ['Place one knee and hand on flat bench.', 'Hold dumbbell with other hand.', 'Pull dumbbell to hip.', 'Lower fully.'], precautions: ['Keep back parallel to floor.'], tips: ['Pull with elbow, not biceps.']
          }
        ]
      },
      {
        dayName: 'Day 3 — Legs Day',
        exercises: [
          {
            name: 'Barbell Squats', sets: 4, reps: '6-8', restSeconds: 150, videoUrl: 'https://www.youtube.com/watch?v=ultWZbUM_s8', notes: 'Primary leg builder.', muscleGroup: 'Legs',
            steps: ['Rest bar on traps.', 'Stand shoulder width.', 'Squat below parallel.', 'Drive up through heels.'], precautions: ['Don\'t let knees cave in.', 'Keep chest up.'], tips: ['Take deep breath and brace core before descending.']
          },
          {
            name: 'Leg Press', sets: 4, reps: '10-12', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7OSvc', notes: 'Heavy quad loading safely.', muscleGroup: 'Legs',
            steps: ['Sit in machine, place feet on platform.', 'Lower weight until knees are 90 degrees.', 'Press up.'], precautions: ['Never fully lock out your knees.', 'Don\'t let lower back round off pad.'], tips: ['Place feet lower for quad focus, higher for glutes/hams.']
          },
          {
            name: 'Leg Extensions', sets: 3, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0', notes: 'Quad isolation.', muscleGroup: 'Legs',
            steps: ['Sit with legs under pad.', 'Extend legs fully.', 'Squeeze quads at top.', 'Lower slowly.'], precautions: ['Don\'t use excessive weight that compromises form.'], tips: ['Point toes up for different stretch.']
          },
          {
            name: 'Leg Curls', sets: 3, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=F488k67BTNo', notes: 'Hamstring isolation.', muscleGroup: 'Legs',
            steps: ['Lie face down on machine.', 'Curl pad towards glutes.', 'Control the negative.'], precautions: ['Keep hips pushed down into the pad.'], tips: ['Squeeze hard at peak contraction.']
          }
        ]
      },
      {
        dayName: 'Day 4 — Shoulders Day',
        exercises: [
          {
            name: 'Overhead Press', sets: 4, reps: '6-8', restSeconds: 120, videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZAHDI', notes: 'Core shoulder builder.', muscleGroup: 'Shoulders',
            steps: ['Stand or sit, press bar overhead.', 'Lock out elbows.', 'Lower strictly to collarbone.'], precautions: ['Don\'t over-arch lower back.'], tips: ['Squeeze glutes if standing.']
          },
          {
            name: 'Dumbbell Lateral Raise', sets: 4, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=WJm9zA36co0', notes: 'Side delt isolation.', muscleGroup: 'Shoulders',
            steps: ['Hold dumbbells at sides.', 'Raise arms straight out until parallel.', 'Lower slowly.'], precautions: ['Don\'t swing.'], tips: ['Lead with elbows, like pouring water from a pitcher.']
          },
          {
            name: 'Front Dumbbell Raise', sets: 3, reps: '12', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=sOcYlNIpHZ4', notes: 'Front delt focus.', muscleGroup: 'Shoulders',
            steps: ['Hold dumbbells in front of thighs.', 'Raise straight out front to shoulder height.', 'Lower strictly.'], precautions: ['Avoid rocking back and forth.'], tips: ['Alternate arms to maintain focus.']
          },
          {
            name: 'Reverse Pec Deck', sets: 3, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=_sAIA062B_M', notes: 'Rear delt isolation.', muscleGroup: 'Shoulders',
            steps: ['Sit facing the pad.', 'Grip handles.', 'Pull arms straight back.', 'Squeeze rear delts.'], precautions: ['Keep chest pressed against pad.'], tips: ['Focus purely on the back of the shoulder.']
          }
        ]
      },
      {
        dayName: 'Day 5 — Arms Day',
        exercises: [
          {
            name: 'Barbell Curls', sets: 4, reps: '10', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo', notes: 'Overall bicep builder.', muscleGroup: 'Biceps',
            steps: ['Stand holding bar at hip width.', 'Curl weight up.', 'Squeeze biceps.', 'Lower.'], precautions: ['No swinging.'], tips: ['Keep elbows pinned to sides.']
          },
          {
            name: 'Hammer Curls', sets: 3, reps: '12', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=TwD-YGVP4Bk', notes: 'Brachialis and forearm focus.', muscleGroup: 'Biceps',
            steps: ['Hold dumbbells neutral grip (palms facing in).', 'Curl up towards shoulders.', 'Lower.'], precautions: ['Keep wrists neutral.'], tips: ['Focus on the squeeze at the top.']
          },
          {
            name: 'Triceps Pushdown', sets: 4, reps: '12', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU', notes: 'Triceps isolation.', muscleGroup: 'Triceps',
            steps: ['Grip rope from high pulley.', 'Push down until arms lock out.', 'Return until forearms are parallel to floor.'], precautions: ['Don\'t let elbows lift up.'], tips: ['Spread rope apart at the bottom.']
          },
          {
            name: 'Overhead Triceps Extension', sets: 3, reps: '12', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=nRiJVZDpdL0', notes: 'Long head triceps target.', muscleGroup: 'Triceps',
            steps: ['Hold dumbbell overhead with both hands.', 'Lower behind head.', 'Extend back up.'], precautions: ['Keep elbows tucked in close to ears.'], tips: ['Focus on deep stretch at bottom.']
          }
        ]
      },
      {
        dayName: 'Day 6 — Core & Abs',
        exercises: [
          {
            name: 'Hanging Leg Raises', sets: 4, reps: '15', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=3RnyNHe9s04', notes: 'Lower ab focus.', muscleGroup: 'Core',
            steps: ['Hang from bar.', 'Raise legs strictly to 90 degrees.', 'Lower under control.'], precautions: ['Don\'t swing body.'], tips: ['Tilt pelvis upward to engage abs fully.']
          },
          {
            name: 'Cable Crunches', sets: 4, reps: '15-20', restSeconds: 60, videoUrl: 'https://www.youtube.com/watch?v=WME1s0hB9mE', notes: 'Weighted ab flexion.', muscleGroup: 'Core',
            steps: ['Kneel facing cable machine.', 'Hold rope behind neck.', 'Crunch downwards, bringing elbows to knees.', 'Return slowly.'], precautions: ['Don\'t pull with arms, crunch with abs.'], tips: ['Round back slightly during contraction to hit abs.']
          },
          {
            name: 'Ab Wheel Rollout', sets: 3, reps: '10', restSeconds: 90, videoUrl: 'https://www.youtube.com/watch?v=rqiTWTEIGAQ', notes: 'Anti-extension core strength.', muscleGroup: 'Core',
            steps: ['Kneel down, grip ab wheel.', 'Roll forward as far as possible keeping rigid torso.', 'Pull back to start using core.'], precautions: ['Don\'t let lower back sag at the bottom.'], tips: ['Squeeze glutes throughout the movement.']
          }
        ]
      },
      {
        dayName: 'Day 7 — Active Recovery',
        exercises: [
          {
            name: 'Light Treadmill Jogging/Walk', sets: 1, reps: '30 mins', restSeconds: 0, videoUrl: 'https://www.youtube.com/watch?v=8i3pLQmO_tA', notes: 'Promote blood flow without stress.', muscleGroup: 'Cardio',
            steps: ['Set treadmill to comfortable brisk walk pace.', 'Maintain steady breathing.', 'Keep heart rate in zone 1-2.'], precautions: ['Don\'t over-exert.'], tips: ['Try listening to a podcast or audiobook.']
          },
          {
            name: 'Full Body Mobility Flow', sets: 1, reps: '15 mins', restSeconds: 0, videoUrl: 'https://www.youtube.com/watch?v=v7SN-d4qXx0', notes: 'Improve recovery and joint health.', muscleGroup: 'Full Body',
            steps: ['Perform cat-camels, worlds greatest stretch, deep squats.', 'Move fluidly.', 'Hold tight spots.'], precautions: ['Don\'t force stretches into pain.'], tips: ['Breathe deeply into stretches.']
          }
        ]
      }
    ]
  }
];

export const DIET_PLANS: DietPlan[] = [
  {
    id: 'dp_lean_mass',
    name: 'High-Prot Hyper Lean Mass',
    goal: 'Target optimized lean muscle expansion with minimal body fat storage',
    dailyGoals: {
      calories: 2600,
      protein: 165,
      carbs: 280,
      fat: 70
    },
    days: [
      {
        dayName: 'Today\'s Meal Structure',
        date: 'May 28',
        totalCalories: 2470,
        totalProtein: 162,
        totalCarbs: 275,
        totalFat: 68,
        meals: [
          {
            type: 'breakfast',
            time: '08:00 AM',
            foods: [
              { name: 'Fluffy Oatmeal Oats', quantity: '80g dry', calories: 300, protein: 11, carbs: 54, fat: 5 },
              { name: 'Fresh Whey Scoop (Vanilla)', quantity: '1 scoop (30g)', calories: 120, protein: 25, carbs: 2, fat: 1 },
              { name: 'Organic Blueberries', quantity: '50g', calories: 30, protein: 0.5, carbs: 7.5, fat: 0.1 },
              { name: 'Whole Eggs (Scrambled)', quantity: '2 medium', calories: 140, protein: 12, carbs: 1, fat: 10 }
            ]
          },
          {
            type: 'lunch',
            time: '01:00 PM',
            foods: [
              { name: 'Grilled Herb Chicken Breast', quantity: '200g', calories: 290, protein: 54, carbs: 0, fat: 6 },
              { name: 'Fragrant Steamed Basmati Rice', quantity: '150g cooked', calories: 195, protein: 4, carbs: 43, fat: 0.5 },
              { name: 'Fresh Steamed Broccoli & Carrots', quantity: '100g', calories: 45, protein: 2.5, carbs: 8, fat: 0.2 },
              { name: 'Organic Cold-Pressed Olive Oil', quantity: '1 tsp', calories: 40, protein: 0, carbs: 0, fat: 4.5 }
            ]
          },
          {
            type: 'snack',
            time: '04:30 PM (Pre/Post Workout)',
            foods: [
              { name: 'Sweet Fresh Cavendish Banana', quantity: '1 large', calories: 110, protein: 1.5, carbs: 28, fat: 0.3 },
              { name: 'Pure Greek Yogurt 0% Fat', quantity: '150g', calories: 90, protein: 15, carbs: 5, fat: 0 },
              { name: 'Natural Crunchy Peanut Butter', quantity: '1 tbsp', calories: 90, protein: 3.5, carbs: 3, fat: 8 }
            ]
          },
          {
            type: 'dinner',
            time: '08:30 PM',
            foods: [
              { name: 'Wild Norwegian Salmon Fillet', quantity: '160g cooked', calories: 320, protein: 32, carbs: 0, fat: 20 },
              { name: 'Roasted Spiced Sweet Potatoes', quantity: '180g', calories: 160, protein: 3, carbs: 37, fat: 0.2 },
              { name: 'Mixed Leafy Green Salad', quantity: '1 big bowl', calories: 30, protein: 1, carbs: 5, fat: 0.2 },
              { name: 'Raw Natural Walnuts', quantity: '15g', calories: 90, protein: 2.5, carbs: 2, fat: 9 }
            ]
          }
        ]
      }
    ]
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch_squats',
    title: 'Daily Squat Commando',
    description: 'Perform 100 bodyweight squats to stimulate circulation and lower-body fast-twitch fibers.',
    xpReward: 150,
    pointsReward: 35,
    participantsCount: 342,
    joined: true,
    progress: 40,
    type: 'daily'
  },
  {
    id: 'ch_steps',
    title: 'Step Master Pro Walk',
    description: 'Hit exactly 10,000 steps tracking clean posture and fluid breathing cycles across the week.',
    xpReward: 350,
    pointsReward: 80,
    participantsCount: 1105,
    joined: false,
    progress: 0,
    type: 'weekly'
  },
  {
    id: 'ch_water',
    title: 'H2O Hydro Warrior',
    description: 'Drink 8 comprehensive glasses (2L+) of pure water every single day for the entire calendar week.',
    xpReward: 250,
    pointsReward: 50,
    participantsCount: 894,
    joined: true,
    progress: 71, // 5 out of 7 days
    type: 'weekly'
  },
  {
    id: 'ch_meditation',
    title: 'Mind-Muscle Resonance',
    description: 'Perform three 3D meditation session elements at 10 minutes depth each.',
    xpReward: 500,
    pointsReward: 120,
    participantsCount: 204,
    joined: false,
    progress: 0,
    type: 'global'
  }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, name: 'Alex Harrison', score: 3820, points: 840, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
  { rank: 2, name: 'Seraphina Vance', score: 3410, points: 720, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
  { rank: 3, name: 'Kundan Saduyashwanth', score: 2850, points: 450, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', isUser: true },
  { rank: 4, name: 'Marcus Sterling', score: 2600, points: 510, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
  { rank: 5, name: 'Elena Rostova', score: 2120, points: 390, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' }
];

export const SHOP_PRODUCTS: Product[] = [
  // ========== EQUIPMENT CATEGORY (Gym bottles & Hardware) ==========
  {
    id: 'p_takeya_actives',
    name: 'Takeya Actives Stainless Steel Water Bottle with Insulated Spout Lid (24oz)',
    category: 'Equipment',
    price: 29.99,
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/61WdRE2Y7ML._AC_SL1500_.jpg',
    description: 'Durable leakproof food-grade bottle keeps pure drinks freezing cold for up to 24 hours. Features a heavy protective silicone bumper at the base.',
    inStock: true,
    amazonUrl: 'https://www.amazon.com/s?k=Takeya+Actives+Stainless+Steel+Water+Bottle+with+Insulated+Spout+Lid+24oz',
    isPrime: true,
    brandName: 'Takeya'
  },
  {
    id: 'p_iron_flask_64',
    name: 'Iron Flask Sports Water Bottle 64oz Half Gallon',
    category: 'Equipment',
    price: 29.95,
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/71S46x6vB%2BL._AC_SL1500_.jpg',
    description: 'Double-walled stainless steel thermal vacuum flask. Keeps water ice-cold for 24 hours. Solid leak-free outer finish with 3 distinct sports lids.',
    inStock: true,
    amazonUrl: 'https://www.amazon.com/s?k=Iron+Flask+Sports+Water+Bottle+64oz+Half+Gallon',
    isPrime: true,
    brandName: 'Iron Flask'
  },
  {
    id: 'p_bowflex_dumbbells',
    name: 'Bowflex SelectTech 552 Adjustable Dumbbells (Pair)',
    category: 'Equipment',
    price: 349.99,
    rating: 4.9,
    image: 'https://m.media-amazon.com/images/I/81tP-z06K8L._AC_SL1500_.jpg',
    description: 'Home workout selectors adjust weight from 5 lbs up to 52.5 lbs in comfortable 2.5 lb increments. Replaces 15 standard barbell pairs.',
    inStock: true,
    amazonUrl: 'https://www.amazon.com/s?k=Bowflex+SelectTech+552+Adjustable+Dumbbells+Pair',
    isPrime: true,
    brandName: 'Bowflex'
  },
  {
    id: 'p_prosource_pullup',
    name: 'ProsourceFit Indoor Multi-Gym doorway Chin Pull Up Bar & Pushup Board',
    category: 'Equipment',
    price: 28.90,
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/71A91-g68UL._AC_SL1500_.jpg',
    description: 'Heavy leverage chin bar sits safely on interior doorframes. Optimized for pullups, deep torso tucks, hanging core leg raises, and pushups.',
    inStock: true,
    amazonUrl: 'https://www.amazon.com/s?k=ProsourceFit+Indoor+Multi-Gym+Chin+Pull+Up+Bar',
    isPrime: true,
    brandName: 'ProsourceFit'
  },

  // ========== APPAREL CATEGORY ==========
  {
    id: 'p_gymshark_leggings',
    name: 'Gymshark High Waisted Sculpt Gym Leggings',
    category: 'Apparel',
    price: 49.99,
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/61MvUqshX5L._AC_SL1500_.jpg',
    description: 'High-waisted premium seamless yarn configuration with custom ventilation circles. Extremely durable and squat-proof.',
    inStock: true,
    amazonUrl: 'https://www.amazon.com/s?k=Gymshark+High+Waisted+Sculpt+Gym+Leggings',
    isPrime: true,
    brandName: 'Gymshark'
  },
  {
    id: 'p_devops_compression_3',
    name: "DEVOPS 3 Pack Men's Gym Compression Long Sleeve",
    category: 'Apparel',
    price: 32.99,
    rating: 4.6,
    image: 'https://m.media-amazon.com/images/I/71A0l7qC9%2BL._AC_SL1500_.jpg',
    description: 'Skin-tight quick-dry long sleeve undergarment designed for thermal protection, heavy sweat dispersion, and high muscle focus holding.',
    inStock: true,
    amazonUrl: 'https://www.amazon.com/s?k=DEVOPS+3+Pack+Mens+Gym+Compression+Long+Sleeve',
    isPrime: true,
    brandName: 'DEVOPS'
  }
];

export const INITIAL_FEED: Post[] = [
  {
    id: 'post_1',
    authorName: 'Coach Harrison',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    timeAgo: '4 hours ago',
    content: 'Just analyzed Kundan\'s Incline Dumbbell push posture using our computer vision Form Analyzer. The lateral alignment is pristine! Next time, focus on bringing the dumbbells 2 inches lower at bottom eccentric for absolute chest fiber recruitment. Keep pushing!',
    likes: 18,
    liked: false,
    comments: [
      { authorName: 'Elena Rostova', content: 'Great tips coach! Form is indeed everything.', timeAgo: '3 hours ago' },
      { authorName: 'Marcus Sterling', content: 'I need tips on my squat eccentric too.', timeAgo: '2 hours ago' }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Seraphina Vance',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    timeAgo: '1 day ago',
    content: 'Completed the "Daily Squat Commando" challenge before breakfast today! Legs are fully fired up. Who is joining me on the Step Master Pro walk this afternoon? Let\'s climb that leaderboard! 🔥🚀',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    likes: 34,
    liked: true,
    comments: [
      { authorName: 'Kundan Saduyashwanth', content: 'Count me in! I need about 4,000 steps to finish my daily loop.', timeAgo: '18 hours ago' }
    ]
  }
];
