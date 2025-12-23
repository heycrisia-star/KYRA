
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const cards = [
    {
      title: "HIPERTROFIA REAL",
      sub: "Programación de Élite",
      icon: "fitness_center",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "MACROS AL DETALLE",
      sub: "Nutrición con base científica",
      icon: "nutrition",
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "RESULTADOS REALES",
      sub: "Seguimiento milimétrico",
      icon: "trending_up",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#0a1618] overflow-x-hidden justify-between py-12">
      <div className="flex flex-col items-center">
        {/* Logo Section - Letra 'K' eliminada */}
        <div className="pt-16 pb-12 px-6 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <div className="flex items-center gap-5">
            {/* Icono KYRO sin la K */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-pulse group-hover:bg-primary/60 transition-all"></div>
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  <span className="material-symbols-outlined text-[84px] text-primary font-black italic scale-x-[-1] leading-none select-none drop-shadow-[0_0_15px_rgba(13,204,242,0.6)]">
                    fitness_center
                  </span>
                </div>
              </div>
            </div>

            {/* Texto KYRO */}
            <div className="flex flex-col items-start leading-none -ml-2">
              <h1 className="text-white text-[74px] font-[900] italic tracking-tighter uppercase mb-0 select-none">
                KYRO
              </h1>
              <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.38em] pl-1.5 select-none">
                ENTRENAMIENTO Y RENDIMIENTO
              </p>
            </div>
          </div>
        </div>

        <div className="px-10 mb-10">
          <p className="text-gray-500 text-[11px] font-bold leading-snug text-center italic uppercase tracking-[0.25em] opacity-60">Protocolos de optimización fisiológica</p>
        </div>
        
        <div className="w-full">
          <div className="flex overflow-x-auto pb-8 px-6 snap-x snap-mandatory no-scrollbar">
            <div className="flex items-stretch gap-6">
              {cards.map((card, idx) => (
                <div key={idx} className="flex h-full flex-col gap-3 rounded-[40px] min-w-[280px] w-[75vw] snap-center transition-transform hover:scale-[1.02]">
                  <div className="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover rounded-[48px] relative overflow-hidden shadow-2xl border border-white/5" style={{ backgroundImage: `url("${card.img}")` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="size-12 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 mb-4 shadow-glow">
                        <span className="material-symbols-outlined text-primary text-2xl font-bold">{card.icon}</span>
                      </div>
                      <p className="text-white text-2xl font-black leading-none uppercase italic tracking-tighter mb-1">{card.title}</p>
                      <p className="text-primary text-[9px] font-black uppercase tracking-[0.4em]">{card.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="px-8 mt-6">
          <p className="text-gray-500 text-[10px] font-black leading-relaxed text-center uppercase tracking-widest opacity-70">
            Diseñamos el protocolo, tú pones el esfuerzo. <br/> 
            <span className="text-white font-black italic tracking-tighter text-sm uppercase">Ciencia aplicada al hierro.</span>
          </p>
        </div>
      </div>

      <div className="w-full px-8 flex flex-col items-center">
        <button 
          onClick={onStart}
          className="w-full bg-primary hover:bg-[#0bc0e3] active:bg-[#09b3d4] text-background-dark text-lg font-black py-6 px-6 rounded-[32px] shadow-glow transition-all duration-300 flex items-center justify-center gap-4 group uppercase tracking-[0.2em] active:scale-95 italic"
        >
          ACCEDER AL SISTEMA
          <span className="material-symbols-outlined font-black group-hover:translate-x-3 transition-transform">bolt</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
