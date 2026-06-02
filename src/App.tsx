import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Modular Page components
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Workouts } from './pages/Workouts';
import { Nutrition } from './pages/Nutrition';
import { ProgressMatrix } from './pages/ProgressMatrix';
import { AICoach } from './pages/AICoach';
import { MeditationZone } from './pages/MeditationZone';
import { Competitions } from './pages/Competitions';
import { Shop } from './pages/Shop';
import { Settings } from './pages/Settings';

// Navigation components
import { HeaderNavigation } from './components/HeaderNavigation';
import { SidebarNavigation } from './components/SidebarNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import { MobileMoreOverlay } from './components/MobileMoreOverlay';

// Type definitions and initial dataset imports
import { User, WorkoutPlan, DietPlan, Challenge, Post, Product, CartItem, WeightRecord } from './types';
import { INITIAL_USER, WORKOUT_PLANS, DIET_PLANS, CHALLENGES, INITIAL_LEADERBOARD, SHOP_PRODUCTS, INITIAL_FEED } from './data';

export default function App() {
  // Authentication & Session States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(0); // 0 means not onboarding yet
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // App States (Retained in memory with LocalStorage backups)
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(WORKOUT_PLANS);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('wp_shred');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  
  const [dietPlans] = useState<DietPlan[]>(DIET_PLANS);
  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES);
  const [leaderboard] = useState(INITIAL_LEADERBOARD);
  const [feed, setFeed] = useState<Post[]>(INITIAL_FEED);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Progress tracking logs state
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([
    { date: 'May 18', weight: 75.2, bmi: 24.5 },
    { date: 'May 20', weight: 74.5, bmi: 24.3 },
    { date: 'May 22', weight: 73.9, bmi: 24.1 },
    { date: 'May 24', weight: 73.1, bmi: 23.8 },
    { date: 'May 26', weight: 72.8, bmi: 23.7 },
    { date: 'Today', weight: 72.0, bmi: 23.5 }
  ]);
  const [weightInput, setWeightInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('175'); // in cm
  const [bmiValue, setBmiValue] = useState<number>(23.5);

  const [progressPhotos, setProgressPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop'
  ]);

  // Onboarding parameters state
  const [onboardingData, setOnboardingData] = useState({
    age: '24',
    weight: '75',
    height: '175',
    gender: 'Male',
    goal: 'Muscle size and lean aesthetics',
    dietType: 'High protein balanced',
    healthConstraints: 'None'
  });

  // Shop filter state
  const [shopCategory, setShopCategory] = useState<'All' | 'Supplements' | 'Equipment' | 'Apparel'>('All');

  // Attendance scanner simulation states
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  // Notification configuration inside settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hudIndicator, setHudIndicator] = useState<string | null>(null);

  // Mobile menu open / close drawer overlay
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  // Load state backups on mounting
  useEffect(() => {
    const backupAuth = localStorage.getItem('fitsphere_auth');
    if (backupAuth === 'true') {
      setIsAuthenticated(true);
    }
    const savedUser = localStorage.getItem('fitsphere_user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedCart = localStorage.getItem('fitsphere_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sync user state changes with localStorage
  const saveUserAndSync = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('fitsphere_user_profile', JSON.stringify(updatedUser));
  };

  // Triggering like button changes
  const handleLikePost = (postId: string) => {
    setFeed((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLikedNow = !post.liked;
          return {
            ...post,
            liked: isLikedNow,
            likes: isLikedNow ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
    showNotification('Staff & Athlete feed like updated!');
  };

  // Adding dynamic comments
  const handleCommentPost = (postId: string, author: string, content: string) => {
    setFeed((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { authorName: author, content: content, timeAgo: 'Just now' }
            ]
          };
        }
        return post;
      })
    );
    showNotification('Constructive comment posted successfully.');
  };

  // Quick alert overlays
  const showNotification = (msg: string) => {
    setHudIndicator(msg);
    setTimeout(() => {
      setHudIndicator(null);
    }, 3200);
  };

  // Weight Logging logic
  const handleAddWeight = () => {
    const parsed = parseFloat(weightInput);
    if (isNaN(parsed) || parsed <= 30 || parsed >= 300) {
      alert('Please enter a realistic weight value in kilograms (30 to 300).');
      return;
    }

    const nextPhotos = [...progressPhotos];
    // Adding standard fallback photos to progression list
    if (nextPhotos.length < 5) {
      nextPhotos.push('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop');
    }

    // BMI Calculation: kg / (height_meters^2)
    const heightM = parseFloat(heightInput) / 100;
    const computedBmi = parsed / (heightM * heightM);
    setBmiValue(computedBmi);

    const record: WeightRecord = {
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
      weight: parsed,
      bmi: parseFloat(computedBmi.toFixed(1))
    };

    const nextHistory = [...weightHistory, record];
    setWeightHistory(nextHistory);
    setWeightInput('');

    // Reward Athlete 50 XP and 10 points for continuous logging!
    const nextUser: User = {
      ...user,
      xp: user.xp + 50,
      points: user.points + 10
    };
    saveUserAndSync(nextUser);
    showNotification('+50 XP logged for Mass analysis feedback!');
  };

  // Dynamic Challenge joined updates
  const handleToggleJoinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const nextState = !ch.joined;
          if (nextState) {
            showNotification(`Linked to "${ch.title}" challenge! Goal progress initialized.`);
          }
          return { ...ch, joined: nextState, progress: nextState ? 10 : 0 };
        }
        return ch;
      })
    );
  };

  const handleClaimChallengeReward = (id: string) => {
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge) return;

    // Award XP & Points
    const nextXp = user.xp + challenge.xpReward;
    const nextPoints = user.points + challenge.pointsReward;
    let nextLevel = user.level;
    let nextTargetXp = user.targetXp;

    // Handle level progression
    if (nextXp >= user.targetXp) {
      nextLevel += 1;
      nextTargetXp = Math.floor(user.targetXp * 1.5);
      showNotification(`🎉 LEVEL EXCEL! Welcome to FitSphere Level ${nextLevel}!`);
    } else {
      showNotification(`Claimed +${challenge.xpReward} XP & +${challenge.pointsReward} Points!`);
    }

    saveUserAndSync({
      ...user,
      xp: nextXp,
      points: nextPoints,
      level: nextLevel,
      targetXp: nextTargetXp
    });

    // Remove the completed challenge to make space for more
    setChallenges((prev) => prev.filter((c) => c.id !== id));
  };

  // Add items to Shop checkout cart
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let nextCart: CartItem[] = [];
      if (existing) {
        nextCart = prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        nextCart = [...prev, { product, quantity: 1 }];
      }
      localStorage.setItem('fitsphere_cart', JSON.stringify(nextCart));
      return nextCart;
    });
    showNotification(`Added ${product.name} to athlete gym bag.`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const nextCart = prev
        .map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      localStorage.setItem('fitsphere_cart', JSON.stringify(nextCart));
      return nextCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('fitsphere_cart');
    showNotification('Athlete bag cleared.');
  };

  const handleCheckoutSecurely = () => {
    if (cart.length === 0) return;
    showNotification('Simulating secure Stripe checkout portal... Completed!');
    
    const itemsTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const orderPoints = Math.floor(itemsTotal * 2);
    
    const nextUser = {
      ...user,
      points: user.points + orderPoints,
      xp: user.xp + Math.floor(itemsTotal * 3)
    };
    saveUserAndSync(nextUser);
    setCart([]);
    localStorage.removeItem('fitsphere_cart');
    alert(`Secure purchase successful! Earned +${orderPoints} loyalty reward points and +${Math.floor(itemsTotal * 3)} XP feedback!`);
  };

  // Onboarding sequence trigger
  const startOnboardingSequence = () => {
    setOnboardingStep(1);
    setIsAuthenticated(true);
    localStorage.setItem('fitsphere_auth', 'true');
  };

  const handleOnboardingComplete = () => {
    const nextUser: User = {
      ...user,
      name: user.name || 'FitSphere Athlete',
      onboardingCompleted: true,
      streak: 1,
      level: 1,
      xp: 150,
      targetXp: 1000,
      points: 200
    };
    saveUserAndSync(nextUser);
    setOnboardingStep(0); // exit onboarding
    setActiveTab('dashboard');
    showNotification('Hyper-personalized biomechanics profile synchronized!');
  };

  const handleExerciseCompleted = (exerciseName: string) => {
    const nextUser = {
      ...user,
      xp: user.xp + 45,
      points: user.points + 15
    };
    saveUserAndSync(nextUser);
    showNotification(`+45 XP logged for completed movement: ${exerciseName}!`);
  };

  const handleCheckInGym = () => {
    setCheckInStatus('scanning');
    setTimeout(() => {
      setCheckInStatus('success');
      const userStreakBack = user.streak + 1;
      const nextUser = {
        ...user,
        streak: userStreakBack,
        points: user.points + 80,
        xp: user.xp + 150
      };
      saveUserAndSync(nextUser);
      showNotification('Check-in approved at FitSphere affiliate gym! Daily streak bumped!');
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('fitsphere_auth');
    setIsAuthenticated(false);
    setOnboardingStep(0);
    setActiveTab('dashboard');
  };

  return (
    <div id="full-workspace-view" className="min-h-screen bg-white font-sans antialiased text-slate-900 flex flex-col justify-between">
      
      {/* HUD dynamic action notifications */}
      {hudIndicator && (
        <div id="hud-notification-bubble" className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-2xl text-[11px] font-black font-mono tracking-wide z-50 shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
          <span>{hudIndicator}</span>
        </div>
      )}

      {/* Landing public header when not logged in */}
      {!isAuthenticated && (
        <header id="public-sticky-header" className="sticky top-0 bg-white border-b border-slate-100 z-40 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md text-white font-extrabold text-xs font-mono">
                FΩ
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                FitSphere <span className="text-indigo-600">AI</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                id="btn-public-signin"
                onClick={() => {
                  setIsAuthenticated(true);
                  localStorage.setItem('fitsphere_auth', 'true');
                }}
                className="text-slate-600 hover:text-indigo-600 text-xs font-black cursor-pointer transition-all"
              >
                Sign In
              </button>
              <button
                id="btn-public-join"
                onClick={startOnboardingSequence}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black px-4.5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Join Free
              </button>
            </div>
          </div>
        </header>
      )}

      {/* main view wrapper */}
      <div id="core-frame-element" className="grow w-full bg-white">
        {!isAuthenticated ? (
          <LandingPage 
            onStartOnboarding={startOnboardingSequence}
            onQuickDashboard={() => {
              setIsAuthenticated(true);
              localStorage.setItem('fitsphere_auth', 'true');
            }}
          />
        ) : onboardingStep > 0 ? (
          <Onboarding 
            onboardingStep={onboardingStep}
            setOnboardingStep={setOnboardingStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
            onComplete={handleOnboardingComplete}
          />
        ) : (
          /* Logged In Dashboard Frame with white backgrounds */
          <div id="app-workspace-container" className="flex h-screen bg-white overflow-hidden relative">
            
            {/* Modular Sidebar menu (desktop) */}
            <SidebarNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              user={user} 
              onLogout={handleLogout} 
            />

            {/* Right frame segments */}
            <main id="app-workspace-main" className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white pb-16 lg:pb-0">
              
              {/* Modular Header Navigation */}
              <HeaderNavigation activeTab={activeTab} user={user} />

              {/* Responsive main tabs screen content */}
              <div id="active-tab-render-viewport" className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 bg-white">
                
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    user={user} 
                    workoutPlans={workoutPlans} 
                    selectedDayIndex={selectedDayIndex} 
                    weightHistory={weightHistory} 
                  />
                )}

                {activeTab === 'workout' && (
                  <Workouts 
                    workoutPlans={workoutPlans}
                    selectedPlanId={selectedPlanId}
                    setSelectedPlanId={setSelectedPlanId}
                    selectedDayIndex={selectedDayIndex}
                    setSelectedDayIndex={setSelectedDayIndex}
                    onCompleteExercise={handleExerciseCompleted}
                  />
                )}

                {activeTab === 'nutrition' && (
                  <Nutrition dietPlans={dietPlans} />
                )}

                {activeTab === 'progress' && (
                  <ProgressMatrix 
                    weightHistory={weightHistory}
                    weightInput={weightInput}
                    setWeightInput={setWeightInput}
                    heightInput={heightInput}
                    setHeightInput={setHeightInput}
                    bmiValue={bmiValue}
                    progressPhotos={progressPhotos}
                    setProgressPhotos={setProgressPhotos}
                    onAddWeightRecord={handleAddWeight}
                    onNotify={showNotification}
                  />
                )}

                {activeTab === 'ai-coach' && (
                  <AICoach />
                )}

                {activeTab === 'meditation' && (
                  <MeditationZone />
                )}

                {activeTab === 'competitions' && (
                  <Competitions 
                    challenges={challenges}
                    leaderboard={leaderboard}
                    userPoints={user.points}
                    onToggleJoin={handleToggleJoinChallenge}
                    onClaimReward={handleClaimChallengeReward}
                    onTriggerProgress={(id) => {
                      setChallenges((prev) =>
                        prev.map((c) => (c.id === id ? { ...c, progress: 100 } : c))
                      );
                      showNotification('Progress pushed to 100%! Claim rewards.');
                    }}
                  />
                )}

                {activeTab === 'shop' && (
                  <Shop 
                    products={SHOP_PRODUCTS}
                    cart={cart}
                    shopCategory={shopCategory}
                    setShopCategory={setShopCategory}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onClearCart={handleClearCart}
                    onCheckout={handleCheckoutSecurely}
                  />
                )}

                {activeTab === 'settings' && (
                  <Settings 
                    user={user}
                    saveUserAndSync={saveUserAndSync}
                    notificationsEnabled={notificationsEnabled}
                    setNotificationsEnabled={setNotificationsEnabled}
                    onNotify={showNotification}
                    onRetriggerOnboarding={() => setOnboardingStep(1)}
                  />
                )}

              </div>
            </main>

            {/* Mobile bottom persistent navigation bar for ultra responsiveness */}
            <MobileNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onOpenExpandedMenu={() => setIsMobileMoreOpen(true)} 
            />

            {/* Mobile overlays for hidden tabs */}
            <MobileMoreOverlay 
              isOpen={isMobileMoreOpen} 
              onClose={() => setIsMobileMoreOpen(false)} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogout={handleLogout} 
            />

          </div>
        )}
      </div>

      {/* Safe platform footer */}
      <footer id="app-static-footer" className="py-4 text-center text-[9px] font-mono text-slate-400 bg-white border-t border-slate-100 select-none">
        © 2026 FitSphere AI Ecosystem • Built securely utilizing deep neural biomechanical models
      </footer>
    </div>
  );
}
