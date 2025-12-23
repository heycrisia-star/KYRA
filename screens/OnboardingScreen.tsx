
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { GoogleGenAI } from '@google/genai';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    goal: 'Hipertrofia',
    gender: 'Hombre',
    age: 25,
    weight: 75,
    height: 175,
    frequency: 4,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulación de procesamiento de IA
    setTimeout(() => {
      onComplete(profile);
    }, 2500);
  };

  const StepIndicator = () => (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
        <span>Paso {step} de 5</span>
        <span>{step * 20}% completado</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary shadow-glow transition-all duration-500 rounded-full" 
          style={{ width: `${step * 20}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-background-dark p-6 overflow-y-auto no-scrollbar">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-500">
          <div className="relative size-24">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl animate-pulse">psychology</span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Generando tu rutina</h2>
            <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">Nuestra IA está analizando tus datos para crear el plan perfecto...</p>
          </div>
        </div>
      ) : (
        <>
          <StepIndicator />

          {step === 1 && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">¿Cuál es tu objetivo principal?</h1>
                <p className="text-gray-500 text-sm">Selecciona el enfoque que guiará la generación de tu rutina.</p>
              </div>
              <div className="grid gap-3">
                {[
                  { id: 'Fuerza', desc: 'Priorizar fuerza máxima y potencia.' },
                  { id: 'Hipertrofia', desc: 'Aumentar masa muscular y volumen.' },
                  { id: 'Resistencia', desc: 'Mejorar capacidad cardiovascular.' },
                  { id: 'Pérdida de peso', desc: 'Reducir grasa manteniendo músculo.' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setProfile({ ...profile, goal: opt.id as any })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      profile.goal === opt.id 
                      ? 'bg-primary/10 border-primary shadow-glow' 
                      : 'bg-surface-dark border-white/5 text-gray-400'
                    }`}
                  >
                    <p className={`font-bold ${profile.goal === opt.id ? 'text-primary' : 'text-white'}`}>{opt.id}</p>
                    <p className="text-xs opacity-60 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Datos corporales</h1>
                <p className="text-gray-500 text-sm">Usados para calcular cargas y progresión.</p>
              </div>
              
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setProfile({...profile, gender: 'Hombre'})}
                    className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs border ${profile.gender === 'Hombre' ? 'bg-primary text-black border-primary shadow-glow' : 'bg-surface-dark border-white/5 text-gray-500'}`}
                  >Hombre</button>
                  <button 
                    onClick={() => setProfile({...profile, gender: 'Mujer'})}
                    className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs border ${profile.gender === 'Mujer' ? 'bg-primary text-black border-primary shadow-glow' : 'bg-surface-dark border-white/5 text-gray-500'}`}
                  >Mujer</button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Edad</label>
                    <input 
                      type="number" 
                      value={profile.age}
                      onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                      className="bg-surface-dark border-white/10 rounded-xl p-4 text-white font-bold focus:border-primary focus:ring-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Peso (kg)</label>
                    <input 
                      type="number" 
                      value={profile.weight}
                      onChange={e => setProfile({...profile, weight: parseInt(e.target.value)})}
                      className="bg-surface-dark border-white/10 rounded-xl p-4 text-white font-bold focus:border-primary focus:ring-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Altura (cm)</label>
                    <input 
                      type="number" 
                      value={profile.height}
                      onChange={e => setProfile({...profile, height: parseInt(e.target.value)})}
                      className="bg-surface-dark border-white/10 rounded-xl p-4 text-white font-bold focus:border-primary focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Frecuencia</h1>
                <p className="text-gray-500 text-sm">¿Cuántos días a la semana puedes entrenar?</p>
              </div>
              <div className="grid gap-3">
                {[2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setProfile({...profile, frequency: num})}
                    className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
                      profile.frequency === num 
                      ? 'bg-primary text-black border-primary shadow-glow' 
                      : 'bg-surface-dark border-white/5 text-gray-400'
                    }`}
                  >
                    <span className="font-black text-xl">{num} días / semana</span>
                    {profile.frequency === num && <span className="material-symbols-outlined">check_circle</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Identidad</h1>
                <p className="text-gray-500 text-sm">¿Cómo quieres que te llamemos?</p>
              </div>
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  placeholder="Ej: Alex Spartan"
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="bg-surface-dark border-white/10 rounded-2xl p-6 text-2xl font-black italic tracking-tighter text-white placeholder:text-gray-800 focus:border-primary focus:ring-0"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300 text-center py-12">
              <div className="size-20 bg-primary/20 rounded-3xl mx-auto flex items-center justify-center shadow-glow border border-primary/20">
                <span className="material-symbols-outlined text-primary text-4xl">rocket_launch</span>
              </div>
              <div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Todo listo, {profile.name}</h1>
                <p className="text-gray-500 text-lg leading-relaxed">Haz clic para que KYRO genere tu protocolo de transformación inteligente.</p>
              </div>
              <div className="bg-surface-dark p-6 rounded-3xl border border-white/5 text-left flex flex-col gap-3">
                <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest">Resumen del Plan</p>
                <div className="flex flex-col gap-1">
                  <p className="text-white font-bold">{profile.goal}</p>
                  <p className="text-gray-500 text-xs">{profile.frequency} sesiones intensas por semana.</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 flex gap-3">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="flex-1 py-5 rounded-xl bg-white/5 text-gray-500 font-bold uppercase tracking-widest text-xs transition-colors hover:text-white"
              >Atrás</button>
            )}
            <button 
              onClick={step === 5 ? handleGenerate : nextStep}
              disabled={step === 4 && !profile.name.trim()}
              className={`flex-[2] py-5 rounded-xl bg-primary text-background-dark font-black uppercase tracking-widest text-xs shadow-glow active:scale-95 transition-all ${step === 4 && !profile.name.trim() ? 'opacity-50 grayscale' : ''}`}
            >
              {step === 5 ? 'Generar mi rutina 🚀' : 'Siguiente'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OnboardingScreen;
