import { User } from '../types';
import { Settings as SettingsIcon, Bell, User as UserIcon, RefreshCw, Scale, Heart, AlertCircle, Camera } from 'lucide-react';
import { useState, ChangeEvent } from 'react';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface SettingsProps {
  user: User;
  saveUserAndSync: (u: User) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (val: boolean) => void;
  onNotify: (msg: string) => void;
  onRetriggerOnboarding: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export function Settings({
  user,
  saveUserAndSync,
  notificationsEnabled,
  setNotificationsEnabled,
  onNotify,
  onRetriggerOnboarding,
  onLogout,
  onDeleteAccount
}: SettingsProps) {
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [showLegalContent, setShowLegalContent] = useState<'terms' | 'privacy' | null>(null);

  const handleLevelUpManualSim = () => {
    const nextXp = user.xp + 250;
    let nextLevel = user.level;
    let nextTargetXp = user.targetXp;
    
    if (nextXp >= user.targetXp) {
      nextLevel += 1;
      nextTargetXp = Math.floor(user.targetXp * 1.5);
      onNotify(`🎉 LEVEL UP! Welcome to FitSphere Level ${nextLevel}!`);
    } else {
      onNotify('Simulated +250 XP reward added!');
    }

    saveUserAndSync({
      ...user,
      xp: nextXp,
      level: nextLevel,
      targetXp: nextTargetXp
    });
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const storageRef = ref(storage, `profiles/${user.id}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      saveUserAndSync({
        ...user,
        photoUrl: url
      });
      onNotify('Profile picture updated successfully!');
    } catch (err) {
      console.error('Photo upload failed:', err);
      onNotify('Failed to upload profile picture.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  return (
    <div className="max-w-4xl bg-white p-2 space-y-6 text-left">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-[#191A23]" />
          Settings Panel
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Access personal credentials, notification channels, biometric resets, and physical target optimizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column Settings Tabs & Details Summary */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-5 shadow-[4px_4px_0px_#191A23] space-y-4">
            <div className="flex items-center gap-3 relative">
              <div className="relative isolate group">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#191A23]"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={isUploadingPhoto} />
                  {isUploadingPhoto ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Camera className="w-4 h-4 text-white" />
                  )}
                </label>
              </div>
              <div className="min-w-0 font-black">
                <span className="text-[10px] font-mono bg-[#B9FF66] border border-[#191A23] text-[#191A23] px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#191A23] uppercase tracking-widest inline-block">LEVEL {user.level}</span>
                <span className="font-extrabold text-[#191A23] text-sm truncate block leading-tight mt-1">{user.name}</span>
                <span className="text-[9px] text-[#191A23] block font-semibold truncate mt-0.5">{user.email}</span>
              </div>
            </div>

            <div className="border-t-2 border-[#191A23]/10 pt-3 space-y-2 font-black">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Streak loyalty count</span>
                <span className="text-[#191A23]">{user.streak} Days</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Reward Points balance</span>
                <span className="text-amber-500">{user.points} PTS</span>
              </div>
            </div>

            <button
              onClick={handleLevelUpManualSim}
              id="btn-settings-sim-xp"
              className="w-full py-2 px-3 bg-[#B9FF66] border-2 border-[#191A23] text-[10px] font-black text-[#191A23] rounded-xl transition-all shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none font-mono tracking-wider uppercase cursor-pointer text-center"
            >
              Simulate Progress +250 XP
            </button>
          </div>

          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-5 shadow-[4px_4px_0px_#191A23]">
            <div className="flex items-start gap-2 text-[#191A23] bg-[#B9FF66]/20 border border-[#191A23] p-3 rounded-2xl">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#191A23]" />
              <div className="text-[11px] leading-relaxed font-black">
                <b className="font-black block text-[#191A23] mb-0.5">Commercial Ready Environment</b>
                Strictly white background parameters, local offline persistence models, and responsive mobile alignments activated.
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns Config forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Core Profile Info */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
            <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none">
              <UserIcon className="w-4 h-4 text-[#191A23]" />
              Athlete Credentials
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">REAL NAME</label>
                <input
                  type="text"
                  value={user.name}
                  id="input-settings-name-field"
                  onChange={(e) => saveUserAndSync({ ...user, name: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-[#191A23] outline-none text-xs font-black bg-white focus:bg-[#B9FF66]/10"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">ATHLETE EMAIL</label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="w-full p-3 rounded-xl border-2 border-[#191A23]/40 outline-none text-xs font-black bg-[#F3F3F3] cursor-not-allowed text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Biomechanical Notifications */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
            <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none">
              <Bell className="w-4 h-4 text-[#191A23]" />
              Notification Settings
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-black text-xs text-[#191A23] block">Push workout split alerts</span>
                <span className="text-[9px] text-slate-500 font-bold leading-normal block max-w-sm">
                  Receive live triggers on target muscular recruitment set updates, nutritional goals, and rest periods limits.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                id="checkbox-settings-push-alert"
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 text-[#191A23] accent-[#B9FF66] border-2 border-[#191A23] checked:bg-[#B9FF66] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Metric resets and Retrigger Onboarding */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
            <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none">
              <RefreshCw className="w-4 h-4 text-[#191A23]" />
              Athlete Reset Control
            </h3>
            
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              If your current physical goals or dietary configurations have shifted, you can re-target variables via standard biometric onboarding.
            </p>

            <div className="pt-2">
              <button
                onClick={onRetriggerOnboarding}
                id="btn-settings-onboarding-restart"
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#B9FF66] text-[#191A23] border-2 border-[#191A23] text-xs font-black rounded-xl shadow-[3px_3px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Re-launch Physical Setup Questionnaire</span>
              </button>
            </div>
          </div>

          {/* Section 4: Help & Feedback */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
            <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none">
              <Heart className="w-4 h-4 text-[#191A23]" />
              Help & Feedback
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Encountered a bug or have a suggestion? We'd love to hear from you. Reach out to our support team to help us improve FitSphere.
            </p>
            <div className="pt-2">
              <a href="mailto:kundansaduyashwanth@gmail.com" className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-white text-[#191A23] border-2 border-[#191A23] text-xs font-black rounded-xl shadow-[3px_3px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all">
                Submit Feedback
              </a>
            </div>
          </div>

          {/* Section 5: Legal & Privacy */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
            <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none">
              <Scale className="w-4 h-4 text-[#191A23]" />
              Terms & Privacy Policies
            </h3>
            <div className="space-y-3">
              <button onClick={() => setShowLegalContent('terms')} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#191A23] transition-colors cursor-pointer group">
                <span className="text-xs font-black text-[#191A23] group-hover:text-indigo-600 transition-colors">Terms and Conditions</span>
                <span className="font-black text-[#191A23]">→</span>
              </button>
              <button onClick={() => setShowLegalContent('privacy')} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#191A23] transition-colors cursor-pointer group">
                <span className="text-xs font-black text-[#191A23] group-hover:text-indigo-600 transition-colors">Privacy Policy</span>
                <span className="font-black text-[#191A23]">→</span>
              </button>
            </div>
          </div>

          {/* Section 6: About Developer */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
             <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none">
              <UserIcon className="w-4 h-4 text-[#191A23]" />
              About Developer
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 tracking-wider uppercase mb-0.5">NAME</span>
                <span className="font-extrabold text-[#191A23] text-sm">KUNDAN SADHU YASWANTH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 tracking-wider uppercase mb-0.5">EMAIL</span>
                <a href="mailto:kundansaduyashwanth@gmail.com" className="font-extrabold text-indigo-600 hover:underline">kundansaduyashwanth@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Section 7: Account Actions */}
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-6 shadow-[4px_4px_0px_#191A23] space-y-4">
            <h3 className="font-extrabold text-[#191A23] text-sm flex items-center gap-2 uppercase font-mono tracking-wider leading-none text-rose-600">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Account Management
            </h3>
            
            <div className="pt-2 space-y-4 flex flex-col">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#191A23] transition-colors cursor-pointer group"
              >
                <span className="text-xs font-black text-[#191A23]">Sign Out</span>
                <span className="font-black text-[#191A23]">→</span>
              </button>
              
              <button
                onClick={onDeleteAccount}
                className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-rose-600 bg-rose-50 hover:bg-rose-600 group transition-all"
              >
                <span className="text-xs font-black text-rose-600 group-hover:text-white transition-colors">Delete Account</span>
                <span className="font-black text-rose-600 group-hover:text-white transition-colors">⚠</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {showLegalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#191A23]/50 p-4 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#191A23] rounded-[24px] shadow-[8px_8px_0px_#191A23] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-slide-up">
            <div className="p-5 border-b-2 border-[#191A23] bg-[#B9FF66]/20 flex justify-between items-center">
              <h2 className="text-lg font-black text-[#191A23] uppercase tracking-wider font-mono">
                {showLegalContent === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
              </h2>
              <button 
                onClick={() => setShowLegalContent(null)}
                className="p-1 hover:bg-[#191A23]/10 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center text-[#191A23] font-bold text-xl leading-none">×</div>
              </button>
            </div>
            <div className="p-6 overflow-y-auto font-medium text-sm text-[#191A23] space-y-4 leading-relaxed">
              {showLegalContent === 'terms' && (
                <>
                  <p className="font-black text-base">Welcome to FitSphere</p>
                  <p>By accessing or using the FitSphere application, you agree to comply with and be bound by these Terms and Conditions.</p>
                  <p className="font-black mt-4">1. Acceptance of Terms</p>
                  <p>You must be at least 13 years old to use this Service. By creating an account, you confirm that the information provided is accurate and complete.</p>
                  <p className="font-black mt-4">2. Health and Safety Disclaimer</p>
                  <p>FitSphere provides fitness and tracking features. The information provided is NOT medical advice. Always consult with a qualified healthcare professional before starting any new diet or exercise regiment.</p>
                  <p className="font-black mt-4">3. User Data and Accounts</p>
                  <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We reserve the right to suspend or terminate accounts that violate our community standards.</p>
                  <p className="font-black mt-4">4. Limitation of Liability</p>
                  <p>In no event shall FitSphere, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                </>
              )}
              {showLegalContent === 'privacy' && (
                <>
                  <p className="font-black text-base">FitSphere Privacy Policy</p>
                  <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the FitSphere application.</p>
                  <p className="font-black mt-4">Information Collection</p>
                  <p>We may collect personal data such as your name, email address, weight, age, and fitness goals when you register on our platform. We also collect usage data to help us improve the application architecture and user experience.</p>
                  <p className="font-black mt-4">Data Security</p>
                  <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
                  <p className="font-black mt-4">Data Sharing</p>
                  <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
                  <p className="font-black mt-4">Your Rights</p>
                  <p>Depending on your location, you may have rights under privacy laws regarding your personal data, including the right to request deletion of your data. You can delete your account and associated data using the "Delete Account" button in Settings.</p>
                </>
              )}
            </div>
            <div className="p-5 border-t-2 border-[#191A23] bg-slate-50 flex justify-end">
              <button 
                onClick={() => setShowLegalContent(null)}
                className="px-6 py-2.5 bg-[#191A23] text-white border-2 border-[#191A23] font-black rounded-xl shadow-[3px_3px_0px_#B9FF66] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all uppercase tracking-wider text-xs"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
