
import React from 'react';
import { ViewType } from '../types';

const BioHackingScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-dark h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400"><span className="material-symbols-outlined text-3xl font-light">arrow_back</span></button>
        <div className="text-center">
          <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-0.5">OPTIMIZACIÓN</p>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">BIO-HACKING</h2>
        </div>
        <div className="size-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-40 flex flex-col gap-8">
        <section className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-[40px] p-8 shadow-glow">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 rounded-2xl bg-yellow-500 flex items-center justify-center text-background-dark shadow-lg">
              <span className="material-symbols-outlined font-black">bolt</span>
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">El 1% Extra</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Hidratación Mineral', desc: 'Agua + Sal Marina al despertar. Mejora conductividad neural.', icon: 'water_drop' },
              { title: 'Grounding', desc: '10 min contacto con tierra para reducir inflamación.', icon: 'nature' },
              { title: 'Timing Solar', desc: 'Exposición ocular 10min AM para regular ritmo circadiano.', icon: 'light_mode' },
              { title: 'Exposición al Frío', desc: 'Ducha fría AM para disparar dopamina y norepinefrina.', icon: 'ac_unit' }
            ].map((h, i) => (
              <div key={i} className="bg-black/20 p-5 rounded-3xl border border-white/5 flex items-start gap-4">
                <span className="material-symbols-outlined text-yellow-500 text-2xl">{h.icon}</span>
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-tight text-white mb-1">{h.title}</h5>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card-dark rounded-[40px] p-8 border border-white/5">
          <h3 className="text-white font-black uppercase italic text-lg mb-6 tracking-tighter">Protocolo Sueño</h3>
          <div className="flex flex-col gap-3">
            {['Magnesio Bisglicinato', 'Sin Pantallas 60min antes', 'Habitación < 19°C', 'Filtro Luz Azul'].map(item => (
              <div key={item} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{item}</span>
                <span className="material-symbols-outlined text-yellow-500/50">verified</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BioHackingScreen;
