
import React, { useState } from 'react';
import { ViewType, Exercise } from '../types';

const EditRoutineScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Fix: Align object literals with the Exercise interface defined in types.ts
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1', 
      name: 'Press de Banca', 
      subName: 'Bench Press',
      zone: 'Pecho', 
      setsCount: 3,
      technique: 'NORMALES'
    },
    {
      id: '2', 
      name: 'Dominadas', 
      subName: 'Pull Ups',
      zone: 'Espalda', 
      setsCount: 3,
      technique: 'NORMALES'
    }
  ]);

  const addExercise = (name: string) => {
    // Fix: Ensure the new exercise matches the Exercise interface properties
    const newEx: Exercise = {
      id: Date.now().toString(),
      name: name,
      subName: 'Variante',
      zone: 'General',
      setsCount: 3,
      technique: 'NORMALES'
    };
    setExercises([...exercises, newEx]);
    alert(`${name} añadido a tu rutina!`);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-hidden h-screen">
      <header className="flex items-center px-6 py-4 justify-between shrink-0 border-b border-white/5">
        <button onClick={() => onNavigate('workout')} className="text-gray-400">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-white text-lg font-black italic tracking-tighter uppercase">Configurar Rutina</h2>
        <button onClick={() => onNavigate('workout')} className="text-primary font-bold text-xs uppercase tracking-widest">Listo</button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 no-scrollbar">
        <div className="mb-8">
          <div className="relative group">
            <input 
              className="w-full bg-card-dark border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-12" 
              placeholder="Buscar ejercicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] px-1">Ejercicios Populares</h3>
          <div className="grid gap-4">
            {['Press Militar', 'Curl Bíceps', 'Extensión Tríceps', 'Remo con Barra'].map(name => (
              <button 
                key={name}
                onClick={() => addExercise(name)}
                className="bg-card-dark p-6 rounded-[32px] border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">add_circle</span>
                  </div>
                  <span className="text-white font-black italic tracking-tight uppercase">{name}</span>
                </div>
                <span className="material-symbols-outlined text-gray-700">chevron_right</span>
              </button>
            ))}
          </div>

          <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] px-1 mt-6">Tu Selección Actual</h3>
          <div className="flex flex-col gap-4">
            {exercises.map(ex => (
              <div key={ex.id} className="bg-primary/5 border border-primary/20 p-6 rounded-[32px] flex items-center gap-4">
                <div className="size-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  {/* Default generic icon as the Exercise interface does not include an icon property */}
                  <span className="material-symbols-outlined text-xl">fitness_center</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm uppercase">{ex.name}</p>
                  <p className="text-[10px] text-gray-500 font-black uppercase">{ex.zone}</p>
                </div>
                <button onClick={() => setExercises(exercises.filter(e => e.id !== ex.id))} className="text-red-500/50 hover:text-red-500">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-20">
        <button onClick={() => onNavigate('workout')} className="w-full bg-primary text-background-dark font-black text-lg py-5 rounded-2xl shadow-glow active:scale-95 transition-all uppercase tracking-widest">
          Finalizar Configuración
        </button>
      </div>
    </div>
  );
};

export default EditRoutineScreen;
