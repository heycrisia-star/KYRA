
import React, { useState, useMemo } from 'react';
import { ViewType, UserProfile } from '../types';

const TECH_COLORS: Record<string, string> = {
  'NORMALES': 'border-[#2ecc71] text-[#2ecc71] bg-[#2ecc71]/5',
  'TOP SET': 'border-[#e67e22] text-[#e67e22] bg-[#e67e22]/5',
  'REST-PAUSE': 'border-[#3498db] text-[#3498db] bg-[#3498db]/5',
  'DROP SET': 'border-[#e91e63] text-[#e91e63] bg-[#e91e63]/5',
};

const WorkoutScreen: React.FC<{ onNavigate: (v: ViewType) => void, initialData?: any[] | null, user: UserProfile | null }> = ({ onNavigate, initialData, user }) => {
  const frequency = user?.frequency || 5;
  const [activeDay, setActiveDay] = useState(1);

  // Generador de rutina coherente basado en la frecuencia
  const routine = useMemo(() => {
    if (initialData && initialData.length > 0) return initialData;

    const daysCount = frequency;
    const isLowFrequency = daysCount <= 4;
    const exercisesPerDay = isLowFrequency ? 8 : 6; // "Más caña" si son pocos días

    const focuses = [
      "PECHO & TRÍCEPS",
      "ESPALDA & BÍCEPS",
      "PIERNA COMPLETA",
      "HOMBRO & ABDOMEN",
      "BRAZOS & PUMP",
      "FULL BODY / WEIDER"
    ];

    const exerciseNames = [
      "Press Banca", "Press Inclinado", "Cruces Polea", "Dominadas", "Remo con Barra",
      "Sentadilla Hack", "Prensa 45º", "Curl Femoral", "Extensiones", "Press Militar",
      "Elevaciones Laterales", "Curl Martillo", "Press Francés", "Fondos", "Zancadas"
    ];

    return Array.from({ length: daysCount }).map((_, i) => ({
      dayNumber: i + 1,
      name: `DÍA ${i + 1}`,
      focus: focuses[i % focuses.length],
      shortFocus: focuses[i % focuses.length].split(' ')[0],
      exercises: Array.from({ length: exercisesPerDay }).map((__, j) => ({
        id: `ex-${i}-${j}`,
        name: exerciseNames[(i + j) % exerciseNames.length].toUpperCase(),
        technique: j === 0 ? "TOP SET" : j % 3 === 0 ? "DROP SET" : "NORMALES",
        lastWeight: 60 + (i * 10),
        sets: 4
      }))
    }));
  }, [frequency, initialData]);

  const currentDayData = routine.find(d => d.dayNumber === activeDay) || routine[0];

  return (
    <div className="flex-1 flex flex-col bg-[#0a1618] h-screen overflow-hidden text-white font-display">
      {/* Header Estilo Referencia */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between shrink-0">
        <button onClick={() => onNavigate('dashboard')} className="text-gray-400 p-2 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <div className="text-center">
           <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 leading-none">RUTINA ACTUAL</p>
           <h1 className="text-[44px] font-[900] italic tracking-tighter uppercase leading-none">DÍA {activeDay}</h1>
           <p className="text-[12px] font-black text-white/60 uppercase tracking-[0.15em] mt-1 italic">
             {currentDayData.focus}
           </p>
        </div>
        <button onClick={() => onNavigate('plan_generator')} className="size-12 rounded-2xl bg-[#16272b] flex items-center justify-center text-primary shadow-lg border border-white/5 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-2xl">psychology</span>
        </button>
      </header>

      {/* Selector de Días Pills Dinámico */}
      <div className="shrink-0 py-4 mb-2">
        <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar">
          {routine.map(d => (
            <button 
              key={d.dayNumber} 
              onClick={() => setActiveDay(d.dayNumber)} 
              className={`shrink-0 h-16 min-w-[120px] px-6 rounded-[28px] flex flex-col items-center justify-center transition-all border-2 ${
                activeDay === d.dayNumber 
                ? 'bg-primary text-background-dark border-primary shadow-glow scale-105' 
                : 'bg-[#16272b]/60 text-gray-500 border-white/5'
              }`}
            >
              <span className="text-[11px] font-black uppercase tracking-widest leading-none">DÍA {d.dayNumber}</span>
              <span className={`text-[8px] font-bold uppercase tracking-tighter mt-1.5 opacity-70`}>
                {d.shortFocus}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr_0.5fr] px-8 py-4 text-[9px] font-black uppercase tracking-widest text-gray-600 border-y border-white/5 bg-background-dark/50">
        <div>EJERCICIO / TÉCNICA</div>
        <div className="text-center">ÚLTIMO / KG</div>
        <div className="text-right">SETS</div>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar px-1 pb-44">
        {currentDayData.exercises.map((ex: any) => (
          <div key={ex.id} className="px-8 py-8 border-b border-white/5 flex flex-col gap-5 group">
            <div className="grid grid-cols-[1.5fr_1fr_0.5fr] items-start">
              <div className="flex flex-col">
                <h4 className="text-lg font-[900] italic uppercase text-gray-100 leading-tight mb-2 tracking-tight">{ex.name}</h4>
                <span className={`self-start px-3 py-1 rounded-[6px] text-[8px] font-black border uppercase tracking-widest ${TECH_COLORS[ex.technique] || 'border-white/10 text-gray-500'}`}>
                  {ex.technique}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-xl font-black italic text-primary">{ex.lastWeight} KG</span>
              </div>
              <div className="text-right text-3xl font-black italic text-white/10 h-full flex items-center justify-end">{ex.sets}</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input 
                  type="number" 
                  placeholder="REGISTRAR PESO..." 
                  className="w-full bg-[#16272b] border-white/10 rounded-2xl p-4 text-xs font-black italic focus:border-primary focus:ring-0 placeholder:text-gray-700"
                />
              </div>
              <button className="bg-primary/10 text-primary size-12 rounded-2xl border border-primary/20 flex items-center justify-center active:scale-90 transition-all shadow-lg">
                <span className="material-symbols-outlined text-2xl font-black">add</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Botón Flotante para finalizar sesión */}
      <div className="fixed bottom-24 left-0 w-full flex justify-center px-6 z-40">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="w-full max-w-xs bg-primary text-background-dark py-4 rounded-full font-black text-sm shadow-glow uppercase tracking-[0.2em] active:scale-95 transition-all italic border border-white/20"
        >
          FINALIZAR ENTRENAMIENTO
        </button>
      </div>
    </div>
  );
};

export default WorkoutScreen;
