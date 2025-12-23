
import React from 'react';
import { ViewType } from '../types';

const tools = [
  { id: 'plan_generator', name: 'Plan Real IA', sub: 'Protocolo Élite', icon: 'rocket_launch', color: 'bg-primary' },
  { id: 'calculator', name: 'Nutrición', sub: 'Macros & Meals', icon: 'calculate', color: 'bg-orange-500' },
  { id: 'food_db', name: 'Alimentos', sub: 'Valores Reales', icon: 'nutrition', color: 'bg-green-500' },
  { id: 'inventory', name: 'Inventario', sub: 'Tus Máquinas', icon: 'inventory', color: 'bg-purple-500' },
  { id: 'glossary', name: 'Glosario', sub: 'Técnica Maestra', icon: 'menu_book', color: 'bg-blue-500' },
  { id: 'habits', name: 'Hábitos', sub: 'Daily Routine', icon: 'check_circle', color: 'bg-red-500' },
  { id: 'bio_hacking', name: 'Bio-Hacking', sub: 'El 1% Extra', icon: 'bolt', color: 'bg-yellow-500' },
  { id: 'progress', name: 'Evolución', sub: 'Gráficas & PRs', icon: 'trending_up', color: 'bg-teal-500' },
];

const ProtocolHubScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <header className="p-8 pt-12">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-2">Protocolo</h1>
        <p className="text-gray-500 text-sm font-medium">Sincronización Total • Alto Rendimiento</p>
      </header>

      <main className="px-6 grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onNavigate(tool.id as ViewType)}
            className="bg-card-dark border border-white/5 p-6 rounded-[32px] flex flex-col items-start gap-4 transition-all active:scale-95 group hover:border-primary/20"
          >
            <div className={`size-12 rounded-2xl ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all`}>
              <span className="material-symbols-outlined text-black font-black">{tool.icon}</span>
            </div>
            <div className="text-left">
              <h3 className="text-white font-black italic uppercase tracking-tighter text-base leading-none mb-1">{tool.name}</h3>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{tool.sub}</p>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
};

export default ProtocolHubScreen;
