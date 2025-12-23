
import React from 'react';
import { ViewType, Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { name: 'Sarah Jenkins', avatar: 'https://picsum.photos/seed/sarah/100/100', squad: 'Escuadrón de Corredores' },
    content: "¡Acabo de correr mis primeros 5k sin parar! Un agradecimiento enorme a todos los que me empujaron la semana pasada cuando quería rendirme. 🏃‍♀️🔥",
    timestamp: 'Hace 2h',
    likes: 24,
    comments: 8,
    type: 'achievement',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF5mTTLtlf_ARjC-OaWAG9qb83CoyysmIzEfHg635BaDLQfeBxgsRLjmvR-pvagpzUerKVmy_OI9VIM3LXBvvo4tcCkiJM0eBJFo5q-cTvwQwdVDvLHjWvdqJlYdFWz0ybFDjqqC3WTj5B6XCq-vMNOB08zvigbOrS95fLpHRk3wfflpcaVQss3XLk2mJQSqYKPV5WXuX_qlr2TrZchcSPJbFIvKB7h8aiJUZ04rb0K6CSPV37VhBnPon2dXLk9AhpEZIp_MGujgij',
    metrics: '5.02 km • 28:14'
  },
  {
    id: '2',
    author: { name: 'Mike Chen', avatar: 'https://picsum.photos/seed/mike/100/100' },
    content: "Luchando con la motivación para entrenar por la tarde ahora que anochece antes. ¿Algún consejo para mantener la energía alta? 🌑",
    timestamp: 'Hace 4h',
    likes: 12,
    comments: 12,
    type: 'discussion'
  }
];

const SocialScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <header className="sticky top-0 z-40 bg-background-dark/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-primary" style={{ backgroundImage: `url("https://picsum.photos/seed/user/100/100")` }}></div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-dark"></div>
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase">Comunidad KYRO</h1>
          </div>
          <button className="relative size-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-300">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
            <span className="absolute top-3 right-3 size-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex p-1 bg-surface-dark rounded-2xl shadow-inner border border-white/5">
            {['Feed', 'Mis Escuadrones', 'Discusión'].map(t => (
              <button key={t} className={`flex-1 py-3 px-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${t === 'Feed' ? 'bg-primary text-background-dark shadow-glow' : 'text-gray-500 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-8 pt-6">
        {/* Escuadrones Horizontales */}
        <section>
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="text-lg font-black italic tracking-tighter uppercase">Tus Escuadrones</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Ver Todo</button>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-5 px-6 pb-2">
            {[
              { name: 'Runners', color: 'from-primary to-blue-600', img: 'https://picsum.photos/seed/runners/100/100' },
              { name: 'Lifters', color: 'from-gray-600 to-gray-800', img: 'https://picsum.photos/seed/lifters/100/100' },
              { name: 'Yoga', color: 'from-teal-500 to-green-600', img: 'https://picsum.photos/seed/yoga/100/100' }
            ].map((sq, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 shrink-0 w-[80px]">
                <div className={`relative size-[72px] rounded-[24px] p-[2px] bg-gradient-to-tr ${sq.color} shadow-lg transition-transform hover:scale-105 cursor-pointer`}>
                  <div className="size-full rounded-[22px] border-2 border-background-dark bg-cover bg-center" style={{ backgroundImage: `url("${sq.img}")` }}></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-center truncate w-full text-gray-500">{sq.name}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-3 shrink-0 w-[80px]">
              <div className="flex items-center justify-center size-[72px] rounded-[24px] bg-surface-dark text-gray-500 border-2 border-transparent border-dashed border-gray-700 hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Explorar</span>
            </div>
          </div>
        </section>

        {/* Tarjeta Tendencia */}
        <section className="px-6">
          <div className="relative overflow-hidden rounded-[32px] h-[220px] shadow-2xl group cursor-pointer border border-white/5">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `linear-gradient(0deg, rgba(16, 31, 34, 1) 0%, rgba(16, 31, 34, 0.2) 70%), url("https://picsum.photos/seed/trending/600/400")` }}></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="bg-primary/20 text-primary border border-primary/30 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">Tendencia ahora</span>
                <span className="material-symbols-outlined text-white/50">more_horiz</span>
              </div>
              <div>
                <h2 className="text-white text-2xl font-black italic tracking-tighter uppercase mb-2">Semana 4: Control de Cuentas</h2>
                <p className="text-gray-400 text-xs font-medium line-clamp-2 leading-relaxed">Comparte tus progresos y bloqueos. ¡Mantengamos el impulso juntos!</p>
                <div className="flex -space-x-2 mt-4">
                  {[1, 2, 3].map(i => <img key={i} className="w-8 h-8 rounded-full border-2 border-background-dark shadow-lg" src={`https://picsum.photos/seed/${i*12}/50/50`} alt="user" />)}
                  <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-card-dark flex items-center justify-center text-[9px] font-black text-primary shadow-lg">+42</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="flex flex-col gap-5 px-6 pb-12">
          <h3 className="text-lg font-black italic tracking-tighter uppercase">Muro de Actividad</h3>
          {MOCK_POSTS.map(post => (
            <div key={post.id} className="bg-surface-dark/50 backdrop-blur-sm rounded-[32px] p-6 shadow-xl border border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex items-start gap-4 mb-5">
                <div className="bg-cover bg-center rounded-2xl size-12 shrink-0 shadow-lg" style={{ backgroundImage: `url("${post.author.avatar}")` }}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-base font-black text-white truncate">{post.author.name}</h4>
                    <span className="text-[10px] font-black text-gray-500 uppercase">{post.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest italic">{post.author.squad || 'Discusión General'}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-medium mb-5">{post.content}</p>
              
              {post.imageUrl && (
                <div className="rounded-[24px] overflow-hidden mb-5 bg-black/20 h-40 relative group shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url("${post.imageUrl}")` }}></div>
                  {post.metrics && (
                    <div className="absolute bottom-4 left-4 bg-primary text-background-dark px-3 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-glow">
                      {post.metrics}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all text-[11px] font-black uppercase group">
                  <span className="material-symbols-outlined text-[20px] group-active:scale-125 transition-transform">favorite</span>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[11px] font-black uppercase group">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[11px] font-black uppercase group">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
          ))}

          {/* Tarjeta de meta del equipo */}
          <div className="bg-gradient-to-br from-primary/10 to-[#102529] rounded-[32px] p-8 shadow-2xl border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[120px] text-primary font-black italic">emoji_events</span>
            </div>
            <div className="relative z-10 flex gap-6 items-center">
              <div className="size-14 rounded-2xl bg-primary shadow-glow flex items-center justify-center shrink-0 border-4 border-background-dark">
                <span className="material-symbols-outlined text-background-dark text-3xl font-black">trophy</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 italic">¡Meta de Escuadrón Alcanzada!</p>
                <h4 className="text-white font-black text-xl italic uppercase tracking-tighter">Team Alpha</h4>
                <p className="text-gray-400 text-sm font-medium">Llegasteis a las 500 horas de entrenamiento colectivo.</p>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full bg-primary text-background-dark font-black text-xs py-4 rounded-2xl shadow-glow hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">¡Celebrar!</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SocialScreen;
