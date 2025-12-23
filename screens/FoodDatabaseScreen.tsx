
import React, { useState } from 'react';
import { ViewType, Food } from '../types';

const PROTEINAS: Food[] = [
  { name: 'Pechuga de Pollo', value: '31g', special: 'No', type: 'proteina' },
  { name: 'Ternera Magra', value: '26g', special: 'Si', type: 'proteina' },
  { name: 'Merluza / Pescado Blanco', value: '18g', special: 'No', type: 'proteina' },
  { name: 'Huevos Camperos', value: '7g/ud', special: 'No', type: 'proteina' },
  { name: 'Claras de Huevo', value: '4g/ud', special: 'No', type: 'proteina' },
  { name: 'Kéfir / Yogur Griego', value: '4g', special: 'No', type: 'proteina' },
];

const CARBOS: Food[] = [
  { name: 'Arroz Blanco (Crudo)', value: '78g', special: 'Alto IG', type: 'carbo' },
  { name: 'Patata / Boniato', value: '17g', special: 'Medio IG', type: 'carbo' },
  { name: 'Pan Masa Madre', value: '50g', special: 'Medio IG', type: 'carbo' },
  { name: 'Plátano', value: '23g', special: 'Alto IG', type: 'carbo' },
  { name: 'Kiwi / Fruta', value: '15g', special: 'Bajo IG', type: 'carbo' },
  { name: 'Avena', value: '60g', special: 'Bajo IG', type: 'carbo' },
];

const GRASAS: Food[] = [
  { name: 'GHEE (Mantequilla Clarificada)', value: '100g', special: 'Saludable', type: 'grasa' },
  { name: 'Aguacate', value: '15g', special: 'Saludable', type: 'grasa' },
  { name: 'AOVE (Aceite Oliva)', value: '100g', special: 'Saludable', type: 'grasa' },
  { name: 'Nueces / Frutos Secos', value: '65g', special: 'Saludable', type: 'grasa' },
  { name: 'Ensalada Mixta / Verduras', value: 'Muy bajo', special: 'Fibra', type: 'grasa' },
];

const FoodDatabaseScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'proteina' | 'carbo' | 'grasa'>('proteina');
  
  const currentList = activeTab === 'proteina' ? PROTEINAS : activeTab === 'carbo' ? CARBOS : GRASAS;
  const colName = activeTab === 'proteina' ? 'PROTEÍNA (100G)' : activeTab === 'carbo' ? 'CARBOS (G)' : 'GRASAS (G)';
  const colFlag = activeTab === 'proteina' ? 'EVITAR NOCHE?' : 'ABSORCIÓN';

  return (
    <div className="flex-1 flex flex-col bg-background-dark h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-6 bg-background-dark/95 border-b border-white/5 flex items-center justify-between shrink-0">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="text-xl font-black italic uppercase tracking-tighter">BASE ALIMENTOS</h2>
        <button className="bg-primary/20 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">+ CREAR</button>
      </header>

      <div className="flex bg-card-dark h-32 border-b border-white/5 shrink-0">
        {[
          { id: 'proteina', label: 'PROTEÍNAS', icon: 'restaurant' },
          { id: 'carbo', label: 'CARBOS', icon: 'bakery_dining' },
          { id: 'grasa', label: 'GRASAS', icon: 'water_drop' }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 flex flex-col items-center justify-center gap-3 border-b-4 transition-all ${activeTab === t.id ? 'border-primary bg-primary/5' : 'border-transparent opacity-30'}`}
          >
            <span className="material-symbols-outlined text-3xl">{t.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.label}</span>
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-auto no-scrollbar pb-32">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_60px] px-6 py-5 text-[9px] font-black uppercase tracking-widest text-gray-500 bg-black/30">
           <div>ALIMENTO</div>
           <div className="text-center">{colName}</div>
           <div className="text-center">{colFlag}</div>
           <div className="text-right">ACCIÓN</div>
        </div>

        {currentList.map((f, i) => (
          <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_60px] items-center px-6 py-7 border-b border-white/5 transition-colors">
             <div className="text-sm font-bold text-gray-200 leading-tight">{f.name}</div>
             <div className="text-center">
               <span className="bg-white/5 px-3 py-1.5 rounded-xl text-xs font-black text-gray-400 border border-white/5">{f.value}</span>
             </div>
             <div className="flex justify-center">
               <span className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                 f.special === 'Si' || f.special === 'Alto IG' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
                 f.special === 'Bajo IG' || f.special === 'Saludable' || f.special === 'Fibra' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                 'bg-white/5 border-white/10 text-gray-400'
               }`}>
                 {f.special}
               </span>
             </div>
             <div className="flex justify-end">
               <button className="size-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"><span className="material-symbols-outlined text-lg">add</span></button>
             </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default FoodDatabaseScreen;
