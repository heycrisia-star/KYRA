
import React, { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import ProgressScreen from './screens/ProgressScreen';
import SocialScreen from './screens/SocialScreen';
import EditRoutineScreen from './screens/EditRoutineScreen';
import AiBotScreen from './screens/AiBotScreen';
import ProtocolHubScreen from './screens/ProtocolHubScreen';
import SmartCalculatorScreen from './screens/SmartCalculatorScreen';
import FoodDatabaseScreen from './screens/FoodDatabaseScreen';
import AiPlanGeneratorScreen from './screens/AiPlanGeneratorScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import InventoryScreen from './screens/InventoryScreen';
import GlossaryScreen from './screens/GlossaryScreen';
import HabitsScreen from './screens/HabitsScreen';
import BioHackingScreen from './screens/BioHackingScreen';
import { ViewType, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  // Initialize from localStorage if available
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('kyro_user_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [customRoutine, setCustomRoutine] = useState<any[] | null>(null);

  // Save to localStorage whenever userProfile changes
  React.useEffect(() => {
    if (userProfile) {
      localStorage.setItem('kyro_user_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'welcome': return <WelcomeScreen onStart={() => setCurrentView('onboarding')} />;
      case 'onboarding': return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'dashboard': return <DashboardScreen onNavigate={setCurrentView} user={userProfile} />;
      case 'workout': return <WorkoutScreen onNavigate={setCurrentView} initialData={customRoutine} user={userProfile} />;
      case 'progress': return <ProgressScreen onNavigate={setCurrentView} />;
      case 'social': return <SocialScreen onNavigate={setCurrentView} />;
      case 'edit': return <EditRoutineScreen onNavigate={setCurrentView} />;
      case 'bot': return <AiBotScreen onNavigate={setCurrentView} />;
      case 'protocol_hub': return <ProtocolHubScreen onNavigate={setCurrentView} />;
      case 'calculator': return <SmartCalculatorScreen onNavigate={setCurrentView} user={userProfile} />;
      case 'food_db': return <FoodDatabaseScreen onNavigate={setCurrentView} />;
      case 'plan_generator': return <AiPlanGeneratorScreen onNavigate={setCurrentView} user={userProfile} onPlanGenerated={(p) => setCustomRoutine(p)} />;
      case 'exercise_detail': return <ExerciseDetailScreen onNavigate={setCurrentView} />;
      case 'inventory': return <InventoryScreen onNavigate={setCurrentView} />;
      case 'glossary': return <GlossaryScreen onNavigate={setCurrentView} />;
      case 'habits': return <HabitsScreen onNavigate={setCurrentView} />;
      case 'bio_hacking': return <BioHackingScreen onNavigate={setCurrentView} />;
      default: return <WelcomeScreen onStart={() => setCurrentView('onboarding')} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen relative bg-background-dark overflow-hidden flex flex-col font-display">
      {renderView()}

      {!['welcome', 'onboarding', 'bot', 'plan_generator', 'exercise_detail', 'inventory', 'glossary', 'habits', 'bio_hacking'].includes(currentView) && (
        <nav className="fixed bottom-0 z-50 w-full bg-background-dark border-t border-white/5 max-w-md px-2">
          <div className="flex justify-around items-center h-[72px] pb-1">
            <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center justify-center w-14 gap-1 transition-all ${currentView === 'dashboard' ? 'text-primary' : 'text-[#315f68]'}`}>
              <span className={`material-symbols-outlined text-[26px] ${currentView === 'dashboard' ? 'drop-shadow-[0_0_8px_rgba(13,204,242,0.8)]' : ''}`}>home</span>
              <span className="text-[8px] font-black uppercase tracking-widest">INICIO</span>
            </button>
            <button onClick={() => setCurrentView('workout')} className={`flex flex-col items-center justify-center w-14 gap-1 transition-all ${currentView === 'workout' ? 'text-primary' : 'text-[#315f68]'}`}>
              <span className={`material-symbols-outlined text-[26px] ${currentView === 'workout' ? 'drop-shadow-[0_0_8px_rgba(13,204,242,0.8)]' : ''}`}>fitness_center</span>
              <span className="text-[8px] font-black uppercase tracking-widest">ENTRENO</span>
            </button>
            <div className="relative -top-3">
              <button onClick={() => setCurrentView('bot')} className="flex items-center justify-center size-14 rounded-full bg-background-dark border-2 border-primary shadow-glow text-primary active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[32px] font-bold">photo_camera</span>
              </button>
            </div>
            <button onClick={() => setCurrentView('protocol_hub')} className={`flex flex-col items-center justify-center w-14 gap-1 transition-all ${currentView === 'protocol_hub' ? 'text-primary' : 'text-[#315f68]'}`}>
              <span className={`material-symbols-outlined text-[26px] ${currentView === 'protocol_hub' ? 'drop-shadow-[0_0_8px_rgba(13,204,242,0.8)]' : ''}`}>hub</span>
              <span className="text-[8px] font-black uppercase tracking-widest">PROTOCOLO</span>
            </button>
            <button onClick={() => setCurrentView('social')} className={`flex flex-col items-center justify-center w-14 gap-1 transition-all ${currentView === 'social' ? 'text-primary' : 'text-[#315f68]'}`}>
              <span className={`material-symbols-outlined text-[26px] ${currentView === 'social' ? 'drop-shadow-[0_0_8px_rgba(13,204,242,0.8)]' : ''}`}>groups</span>
              <span className="text-[8px] font-black uppercase tracking-widest">SOCIAL</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
