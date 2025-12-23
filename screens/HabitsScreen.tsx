
import React from 'react';
import { ViewType } from '../types';

const HabitsScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-dark h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl font-light">arrow_back</span>
        </button>
        <div className="text-center">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-0.5">07. Protocolo</p>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">HÁBITOS & SUPLES</h2>
        </div>
        <div className="size-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-40">
        <div className="flex flex-col gap-8">
          {/* Intro Section */}
          <section className="text-center px-4">
            <p className="text-gray-300 text-sm font-medium leading-relaxed italic">
              "Optimización fisiológica y bio-hacking. Marca tu progreso diario."
            </p>
          </section>

          {/* Medical Note */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-5 flex gap-4 items-start">
            <span className="material-symbols-outlined text-orange-500">warning</span>
            <p className="text-[11px] text-orange-200/80 font-medium leading-relaxed">
              <strong className="text-orange-400 uppercase tracking-widest block mb-1">Nota Médica:</strong>
              Lo ideal para una suplementación precisa es partir de una analítica completa y siempre bajo recomendación profesional.
            </p>
          </div>

          {/* Protocolo Básico */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 px-2 flex items-center gap-2">
              <span className="h-px w-8 bg-gray-800"></span>
              PROTOCOLO BÁSICO
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: 'CREATINA', desc: 'Indispensable. Beneficios cognitivos y musculares.', icon: 'pill' },
                { name: 'OMEGA 3', desc: 'Cena. Potente antiinflamatorio sistémico.', icon: 'water_drop' },
                { name: 'MAGNESIO', desc: 'Antes de dormir. Relajación muscular y neural.', icon: 'bedtime' },
                { name: 'ASHWAGANDHA', desc: 'Control del cortisol y mejora del descanso nocturno.', icon: 'psychology' }
              ].map((s, i) => (
                <div key={i} className="bg-card-dark p-5 rounded-[32px] border border-white/5 flex items-center gap-5 group hover:border-primary/30 transition-all">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined font-bold">{s.icon}</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-black italic uppercase text-white mb-0.5">{s.name}</h5>
                    <p className="text-[11px] text-gray-500 font-medium leading-tight">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chupito Salud Total */}
          <section className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-[40px] p-8 shadow-glow">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-2xl bg-green-500 flex items-center justify-center text-background-dark shadow-lg">
                <span className="material-symbols-outlined font-black">eco</span>
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Chupito "Salud Total"</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-3">Ingredientes Diarios</p>
                <ul className="grid grid-cols-1 gap-2">
                  {[
                    'Vinagre Manzana (Sin Filtrar/Madre)',
                    '1/2 Limón Exprimido',
                    'Jengibre (Rallado + Polvo)',
                    'Cúrcuma + Pimienta Negra',
                    'Pizca de Sal Marina'
                  ].map((ing, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-gray-300 bg-black/20 p-3 rounded-xl border border-white/5">
                      <span className="size-1.5 rounded-full bg-green-500"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/30 rounded-3xl p-5 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Opción Desparasitante</p>
                <p className="text-[11px] text-gray-400 leading-relaxed italic">
                  Durante 3 días seguidos cada mes, agrega 1 cucharada grande de semillas de papaya machacadas para convertirlo en un potente desparasitante natural.
                </p>
              </div>

              <p className="text-[10px] font-black text-center text-green-500/60 uppercase tracking-widest mt-4">
                Tomar en ayunas para mejorar sensibilidad a la insulina y reducir inflamación.
              </p>
            </div>
          </section>

          {/* Bio-Hacks */}
          <section className="flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 px-2 flex items-center gap-2">
              <span className="h-px w-8 bg-gray-800"></span>
              ⚡ Bio-Hacks: El 1% Extra
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Hidratación Mineral', desc: 'Agua + Sal Marina al despertar. Electrolitos.', icon: 'water_drop' },
                { title: 'Timing Solar', desc: 'Luz solar directa y Grounding.', icon: 'light_mode' },
                { title: 'Adaptógenos', desc: 'Ashwagandha para gestión del estrés.', icon: 'psychology' },
                { title: 'Enfoque Híbrido', desc: 'Fuerza pesada + Rodajes suaves (Z2).', icon: 'directions_run' }
              ].map((h, i) => (
                <div key={i} className="bg-card-dark p-6 rounded-[32px] border border-white/5 flex flex-col gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">{h.icon}</span>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-tight text-white mb-1 leading-none">{h.title}</h5>
                    <p className="text-[9px] text-gray-500 font-bold leading-tight uppercase tracking-tighter">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist Diario */}
          <section className="bg-card-dark rounded-[40px] p-8 border border-white/5">
            <h3 className="text-white font-black uppercase italic text-lg mb-6 tracking-tighter">Checklist de Hábitos</h3>
            <div className="flex flex-col gap-3">
              {['Chupito Tomado', 'Exposición Solar', 'Electrolitos AM', 'Creatina + Suples', 'Sueño Optimizado'].map(item => (
                <button key={item} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 active:bg-primary/10 group transition-all">
                  <span className="text-xs font-bold text-gray-300 group-active:text-primary uppercase tracking-widest">{item}</span>
                  <div className="size-6 rounded-full border-2 border-primary/30 group-active:bg-primary group-active:border-primary transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-background-dark text-xs opacity-0 group-active:opacity-100 font-black">check</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HabitsScreen;
