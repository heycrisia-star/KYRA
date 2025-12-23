
import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';

const ExerciseDetailScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const [currentSet, setCurrentSet] = useState(1);
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(8);
  const [rpe, setRpe] = useState(7);
  
  // Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // Default 90 seconds

  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      // Play a subtle sound or vibrate here if possible
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleCompleteSet = () => {
    if (currentSet < 3) {
      setCurrentSet(s => s + 1);
      setTimeLeft(90); // Reset timer
      setTimerActive(true);
    } else {
      onNavigate('workout');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark h-screen overflow-hidden text-white font-display">
      {/* Header Detalle */}
      <header className="px-6 pt-10 pb-4 bg-background-dark">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => onNavigate('workout')} className="text-gray-400">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="text-center">
             <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">Rutina Activa</p>
             <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Día 1</h1>
          </div>
          <button className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400">
            <span className="material-symbols-outlined">format_list_bulleted</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-8">
        {/* Timer UI if active */}
        {timerActive && (
          <div className="bg-primary/10 border border-primary/20 rounded-[32px] p-6 flex flex-col items-center gap-2 animate-in slide-in-from-top duration-300">
             <span className="text-[10px] font-black uppercase text-primary tracking-widest">Tiempo de Descanso</span>
             <span className="text-5xl font-black italic tracking-tighter text-primary">{formatTime(timeLeft)}</span>
             <button onClick={() => setTimerActive(false)} className="text-[10px] font-bold text-gray-500 uppercase mt-2">Omitir</button>
          </div>
        )}

        {/* Info Ejercicio */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-secondary/40 text-primary border border-primary/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Compound</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">Ejercicio {currentSet} de 6</span>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight text-white drop-shadow-lg">
            Press Convergente
          </h2>
        </div>

        {/* Selector de Sets */}
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(s => (
            <button 
              key={s} 
              onClick={() => setCurrentSet(s)}
              className={`size-14 rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                currentSet === s 
                ? 'bg-primary text-black border-primary shadow-glow scale-110' 
                : 'bg-card-dark text-gray-500 border-white/5'
              }`}
            >
              S{s}
            </button>
          ))}
        </div>

        {/* Cards de Entrada */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card-dark border border-white/5 rounded-[40px] p-8 flex flex-col items-center gap-6 shadow-xl">
             <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Carga (KG)</p>
             <div className="flex items-center gap-4">
                <button onClick={() => setWeight(Math.max(0, weight - 2.5))} className="size-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500">
                   <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="text-4xl font-black italic tracking-tighter text-white">{weight}</span>
                <button onClick={() => setWeight(weight + 2.5)} className="size-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500">
                   <span className="material-symbols-outlined">add</span>
                </button>
             </div>
          </div>
          <div className="bg-card-dark border border-white/5 rounded-[40px] p-8 flex flex-col items-center gap-6 shadow-xl">
             <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Reps</p>
             <div className="flex items-center gap-4">
                <button onClick={() => setReps(Math.max(0, reps - 1))} className="size-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500">
                   <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="text-4xl font-black italic tracking-tighter text-white">{reps}</span>
                <button onClick={() => setReps(reps + 1)} className="size-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500">
                   <span className="material-symbols-outlined">add</span>
                </button>
             </div>
          </div>
        </div>

        {/* RPE Slider */}
        <div className="bg-card-dark/50 border border-white/5 rounded-[40px] p-8 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] italic">Intensidad RPE: {rpe}</p>
              <span className="bg-secondary/30 text-primary px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Esfuerzo</span>
           </div>
           <input 
             type="range" min="1" max="10" step="0.5" value={rpe}
             onChange={e => setRpe(parseFloat(e.target.value))}
             className="w-full h-2 bg-background-dark rounded-full appearance-none accent-primary" 
           />
        </div>

        {/* Botón de Acción */}
        <div className="mt-auto">
          <button 
             onClick={handleCompleteSet}
             className="w-full bg-primary hover:bg-primary-dark text-background-dark py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-3 uppercase tracking-widest shadow-glow active:scale-95 transition-all"
          >
             Completar Serie {currentSet}
             <span className="material-symbols-outlined font-black">check</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ExerciseDetailScreen;
