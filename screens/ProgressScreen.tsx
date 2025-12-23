
import React, { useState } from 'react';
import { ViewType } from '../types';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const chartDataMap: Record<string, any[]> = {
  'SENTADILLA': [
    { name: 'S1', value: 120 }, { name: 'S2', value: 125 }, { name: 'S3', value: 132 }, { name: 'S4', value: 142.5 },
  ],
  'PRESS BANCA': [
    { name: 'S1', value: 80 }, { name: 'S2', value: 82.5 }, { name: 'S3', value: 85 }, { name: 'S4', value: 90 },
  ],
  'PESO MUERTO': [
    { name: 'S1', value: 140 }, { name: 'S2', value: 150 }, { name: 'S3', value: 155 }, { name: 'S4', value: 165 },
  ],
  'PRESS MILITAR': [
    { name: 'S1', value: 50 }, { name: 'S2', value: 52.5 }, { name: 'S3', value: 55 }, { name: 'S4', value: 60 },
  ],
};

const ProgressScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState('MES');
  const [selectedExercise, setSelectedExercise] = useState('SENTADILLA');

  const exercises = ['SENTADILLA', 'PRESS BANCA', 'PESO MUERTO', 'PRESS MILITAR'];
  const timeRanges = ['SEMANA', 'MES', 'AÑO', 'TODO'];

  const currentChartData = chartDataMap[selectedExercise] || chartDataMap['SENTADILLA'];

  return (
    <div className="flex-1 flex flex-col bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center p-6 justify-between w-full">
          <button onClick={() => onNavigate('dashboard')} className="flex size-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-white text-2xl">arrow_back</span>
          </button>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">TU PROGRESO</h2>
          <div className="w-10 flex justify-end">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-white text-2xl">tune</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-8 p-6">
        <section>
          <div className="bg-[#1a2c30] p-1.5 rounded-[24px] border border-white/5 shadow-inner">
            <div className="flex h-12 w-full">
              {timeRanges.map(t => (
                <button 
                  key={t} 
                  onClick={() => setTimeRange(t)}
                  className={`flex-1 flex items-center justify-center rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    timeRange === t ? 'bg-primary text-background-dark shadow-glow' : 'text-gray-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {exercises.map(e => (
              <button 
                key={e} 
                onClick={() => setSelectedExercise(e)}
                className={`flex h-12 shrink-0 items-center justify-center px-8 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${
                  selectedExercise === e ? 'bg-primary text-background-dark border-primary shadow-glow' : 'bg-[#1a2c30]/50 border-white/10 text-gray-400'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-6 bg-card-dark rounded-[48px] p-8 shadow-2xl border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.3em]">ESTIMACIÓN 1RM</p>
                <h3 className="text-5xl font-black tracking-tighter text-white italic">
                  {currentChartData[currentChartData.length - 1].value} 
                  <span className="text-xl font-normal text-gray-500 italic ml-2">kg</span>
                </h3>
              </div>
              <div className="flex items-center gap-1.5 bg-green-500/10 px-4 py-2 rounded-2xl border border-green-500/20 shadow-lg">
                <span className="material-symbols-outlined text-green-500 text-lg font-bold">trending_up</span>
                <span className="text-green-400 text-[10px] font-black uppercase tracking-wider">+2.5%</span>
              </div>
            </div>

            <div className="relative h-56 w-full mt-6 z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentChartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0dccf2" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0dccf2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0dccf2" 
                    strokeWidth={5} 
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                    dot={{ r: 6, fill: '#0dccf2', stroke: '#101f22', strokeWidth: 3 }}
                    activeDot={{ r: 8, stroke: '#0dccf2', strokeWidth: 2, fill: '#fff' }}
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 'bold' }} dy={10} />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProgressScreen;
