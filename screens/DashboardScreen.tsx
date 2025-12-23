
import React, { useState, useEffect } from 'react';
import { ViewType, UserProfile } from '../types';
import { GoogleGenAI } from '@google/genai';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartData = [
  { day: 'L', vol: 4200 },
  { day: 'M', vol: 3800 },
  { day: 'M', vol: 5100 },
  { day: 'J', vol: 0 },
  { day: 'V', vol: 4900 },
  { day: 'S', vol: 5500 },
  { day: 'D', vol: 3200 },
];

const DashboardScreen: React.FC<{ onNavigate: (v: ViewType) => void; user: UserProfile | null }> = ({ onNavigate, user }) => {
  const [insight, setInsight] = useState<string>("Analizando tu estado...");

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto pb-32 no-scrollbar">
      {/* Portada de Alto Impacto */}
      <section className="relative h-[300px] w-full shrink-0">
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000"
          className="h-full w-full object-cover"
          alt="Elite Training"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none mb-2">
              {user?.name || 'ATLETA'}
            </h1>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">SISTEMA ACTIVO • {user?.goal || 'HIPERTROFIA'}</p>
            </div>
          </div>
          <button onClick={() => onNavigate('onboarding')} className="size-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </section>

      <main className="flex flex-col gap-6 p-4 -mt-4 z-10">
        {/* Gráfica de Seguimiento de Entrenos */}
        <section className="bg-card-dark rounded-[40px] p-6 border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-6 px-2">
            <div>
              <h3 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">Volumen Total</h3>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Semanas 12 - Tendencia Alza</p>
            </div>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0dccf2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0dccf2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="vol" stroke="#0dccf2" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-3xl border border-primary/20 flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl animate-pulse">auto_awesome</span>
          <p className="text-sm font-medium text-gray-300 italic">"Entrena con intensidad y maximiza hoy tu hipertrofia!"</p>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => onNavigate('progress')} className="bg-card-dark p-6 rounded-[32px] border border-white/5 flex flex-col justify-between h-40 cursor-pointer active:scale-95 transition-all">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Actividad</span>
            <div>
              <p className="text-3xl font-black text-white italic">4,500 <span className="text-xs">PASOS</span></p>
              <div className="h-1.5 w-full bg-white/5 rounded-full mt-2">
                <div className="h-full bg-primary/40 w-[45%] rounded-full shadow-glow"></div>
              </div>
            </div>
          </div>
          <div onClick={() => onNavigate('calculator')} className="bg-card-dark p-6 rounded-[32px] border border-white/5 flex flex-col justify-between h-40 cursor-pointer active:scale-95 transition-all">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Proteína</span>
            <div>
              <p className="text-3xl font-black text-white italic">82 <span className="text-xs">G</span></p>
              <div className="h-1.5 w-full bg-white/5 rounded-full mt-2">
                <div className="h-full bg-orange-400 w-[60%] rounded-full shadow-[0_0_10px_rgba(251,146,60,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
