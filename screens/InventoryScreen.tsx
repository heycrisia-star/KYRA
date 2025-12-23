
import React, { useState } from 'react';
import { ViewType, Machine } from '../types';

const MACHINES: Machine[] = [
  { id: 1, name: 'Lat Machine Convergent', subName: 'Jalon convergente', mainZone: 'Dorsal ancho', secondaryMuscles: ['Espalda', 'Biceps'] },
  { id: 2, name: 'High Row', subName: 'Remo alto', mainZone: 'Espalda Alta / Densidad', secondaryMuscles: ['Espalda', 'Hombro', 'Biceps'] },
  { id: 3, name: 'Super Low Row', subName: 'Remo bajo convergente', mainZone: 'Dorsal Bajo / Iliocostal', secondaryMuscles: ['Espalda', 'Biceps'] },
  { id: 4, name: 'Super Rowing', subName: 'Remo sentado peso libre', mainZone: 'Espalda General', secondaryMuscles: ['Espalda', 'Biceps'] },
  { id: 5, name: 'Super Pullover Machine', subName: 'Pullover en maquina', mainZone: 'Dorsal / Serratos', secondaryMuscles: ['Espalda', 'Pecho', 'Triceps'] },
  { id: 6, name: 'Smith Machine Counterbalanced', subName: 'Multipower', mainZone: 'Multifuncional', secondaryMuscles: ['General', 'Pecho', 'Hombro', 'Pierna', 'Gluteo', 'Triceps', 'Biceps', 'Espalda'] },
  { id: 7, name: 'Curling Machine', subName: 'Maquina de curl de biceps', mainZone: 'Bíceps Braquial', secondaryMuscles: ['Biceps'] },
  { id: 8, name: 'Half Rack', subName: 'Jaula media / Peso Libre', mainZone: 'Multifuncional', secondaryMuscles: ['General', 'Pecho', 'Hombro', 'Pierna', 'Gluteo', 'Biceps', 'Triceps', 'Espalda'] },
  { id: 9, name: 'Dual Leg Extension', subName: 'Extension de piernas', mainZone: 'Cuádriceps', secondaryMuscles: ['Pierna'] },
  { id: 10, name: 'Hip Abduction / Adduction', subName: 'Abductores / Aductores', mainZone: 'Cadera / Interior Muslo', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 11, name: 'Hip Thrust', subName: 'Empuje de cadera', mainZone: 'Glúteo Mayor', secondaryMuscles: ['Gluteo', 'Pierna'] },
  { id: 12, name: 'Calf - Hack Machine', subName: 'Gemelo en Hack', mainZone: 'Gemelos / Sóleo', secondaryMuscles: ['Pierna'] },
  { id: 13, name: 'Hack Squat', subName: 'Sentadilla Hack', mainZone: 'Cuádriceps / Glúteo', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 14, name: 'Leg Press 45°', subName: 'Prensa 45 grados', mainZone: 'Pierna Completa', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 15, name: 'Super Horizontal Leg Press', subName: 'Prensa horizontal', mainZone: 'Pierna Completa', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 16, name: 'Super Vertical Leg Press', subName: 'Prensa vertical', mainZone: 'Cuádriceps / Femoral', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 17, name: 'Leg Curling', subName: 'Curl femoral tumbado', mainZone: 'Isquiotibiales', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 18, name: 'Kneeling Leg Curling', subName: 'Curl femoral de pie', mainZone: 'Isquiotibiales Unilateral', secondaryMuscles: ['Pierna', 'Gluteo'] },
  { id: 19, name: 'Leg Extension', subName: 'Extension de piernas', mainZone: 'Cuádriceps', secondaryMuscles: ['Pierna'] },
  { id: 20, name: 'Power Smith Machine Upper', subName: 'Multipower Inclinada', mainZone: 'Pectoral Superior', secondaryMuscles: ['Pecho', 'Hombro', 'Triceps'] },
  { id: 21, name: 'Peck Back', subName: 'Aperturas inversas / Peck Deck', mainZone: 'Deltoides Posterior / Pecho', secondaryMuscles: ['Hombro', 'Pecho'] },
  { id: 22, name: 'Deltoid Press', subName: 'Press de hombros maquina', mainZone: 'Deltoides Anterior/Medio', secondaryMuscles: ['Hombro', 'Triceps'] },
  { id: 23, name: 'Vertical Chest Press', subName: 'Press vertical pecho', mainZone: 'Pectoral Medio', secondaryMuscles: ['Pecho', 'Hombro', 'Triceps'] },
  { id: 24, name: 'Super Inclined Bench Press', subName: 'Press inclinado placas', mainZone: 'Pectoral Superior', secondaryMuscles: ['Pecho', 'Hombro', 'Triceps'] },
  { id: 25, name: 'Power Smith Dual System', subName: 'Multipower Horizontal', mainZone: 'Pectoral General', secondaryMuscles: ['Pecho', 'Hombro', 'Triceps', 'Biceps', 'Espalda', 'Pierna', 'Gluteo'] },
  { id: 26, name: 'Standing Multi Flight', subName: 'Aperturas de pie / Cruce', mainZone: 'Pectoral (Cruce) / Hombro', secondaryMuscles: ['Pecho', 'Hombro', 'Biceps', 'Triceps'] },
  { id: 27, name: 'Pulley Row', subName: 'Remo bajo polea', mainZone: 'Espalda Densidad', secondaryMuscles: ['Espalda', 'Biceps', 'Hombro'] },
  { id: 28, name: 'Lat Pulldown', subName: 'Jalon polea alta', mainZone: 'Dorsal Amplitud', secondaryMuscles: ['Espalda', 'Biceps'] },
  { id: 29, name: 'Triceps Station / Polea', subName: 'Estación de Poleas', mainZone: 'Tríceps / Bíceps / Hombro', secondaryMuscles: ['Triceps', 'Biceps', 'Hombro', 'Espalda', 'Pecho'] },
  { id: 30, name: 'Mancuernas Varias', subName: 'Zona Mancuernas', mainZone: 'Todo el cuerpo', secondaryMuscles: ['General'] },
  { id: 31, name: 'Bancos Regulables', subName: 'Zona Bancos', mainZone: 'General', secondaryMuscles: ['General'] },
  { id: 32, name: 'Barras Olímpicas', subName: 'Zona Barras / Peso Libre', mainZone: 'General', secondaryMuscles: ['General'] },
];

const InventoryScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  
  const filtered = MACHINES.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.subName.toLowerCase().includes(search.toLowerCase()) ||
    m.mainZone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-background-dark h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-10 pb-6 bg-background-dark border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400"><span className="material-symbols-outlined">arrow_back</span></button>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">INVENTARIO MAQUINARIA</h2>
          <div className="size-8"></div>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar máquina o zona..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-card-dark border-white/10 rounded-2xl p-5 pl-12 text-white focus:border-primary focus:ring-0"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">search</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-32">
        <div className="flex flex-col gap-4">
          {filtered.map((m) => (
            <div key={m.id} className="bg-card-dark p-6 rounded-[32px] border border-white/5 flex flex-col gap-3 group hover:border-primary/40 transition-all">
              <div className="flex justify-between items-start">
                <div>
                   <span className="text-primary text-[10px] font-black uppercase tracking-widest leading-none block mb-1">Máquina #{m.id}</span>
                   <h3 className="text-lg font-black italic uppercase tracking-tighter text-white">{m.name}</h3>
                   <p className="text-xs text-gray-500 font-bold uppercase">{m.subName}</p>
                </div>
                <div className="bg-primary/20 text-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase">{m.mainZone}</div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                 {m.secondaryMuscles.map(mus => (
                   <span key={mus} className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-[8px] font-black uppercase text-gray-400">
                     {mus}
                   </span>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InventoryScreen;
