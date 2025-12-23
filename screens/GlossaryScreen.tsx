
import React from 'react';
import { ViewType } from '../types';

const GlossaryScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const techniques = [
    {
      title: 'NORMALES',
      desc: '12 reps controladas. Al bajar a 10-6 reps, es obligatorio subir peso.',
      color: 'text-[#2ecc71]',
      border: 'border-[#2ecc71]/20'
    },
    {
      title: 'TOP SET + BACKOFF',
      desc: '1 serie al fallo real + 2 bajando peso un 15%.',
      color: 'text-[#e67e22]',
      border: 'border-[#e67e22]/20'
    },
    {
      title: 'REST-PAUSE',
      desc: 'Fallo → Descansa 15s → Fallo → Descansa 15s → Fallo.',
      color: 'text-[#3498db]',
      border: 'border-[#3498db]/20'
    },
    {
      title: 'DROP SET',
      desc: 'Al fallar, baja peso un 30% y sigue sin descanso.',
      color: 'text-[#e91e63]',
      border: 'border-[#e91e63]/20'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#050b14] h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between shrink-0">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500 text-lg">muscle</span>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Glosario de Técnicas</h2>
        </div>
        <div className="size-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6">
        <div className="grid grid-cols-1 gap-4 pb-32">
          {techniques.map((item, i) => (
            <div 
              key={i} 
              className={`bg-[#0a111e] p-8 rounded-[24px] border-l-4 ${item.border} shadow-2xl transition-all active:scale-[0.98]`}
            >
              <h5 className={`${item.color} font-black uppercase italic text-sm mb-3 tracking-widest`}>
                {item.title}
              </h5>
              <p className="text-sm text-gray-300 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
          
          <div className="mt-8 bg-card-dark/20 p-8 rounded-[32px] border border-white/5">
            <h3 className="text-white font-black italic uppercase tracking-tighter text-lg mb-4">Instrucciones de Uso</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Aplica estas técnicas según se indique en tu rutina diaria para maximizar el estrés metabólico y la tensión mecánica, factores clave en la hipertrofia de alto rendimiento.
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#050b14] via-[#050b14]/90 to-transparent">
        <button 
          onClick={() => onNavigate('protocol_hub')}
          className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-400"
        >
          Volver al Protocolo
        </button>
      </div>
    </div>
  );
};

export default GlossaryScreen;
