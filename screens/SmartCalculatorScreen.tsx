
import React, { useState, useMemo } from 'react';
import { ViewType, UserProfile } from '../types';

interface MealItem {
  name: string;
  amount: string;
  p: number;
  c: number;
  f: number;
}

interface MealGroup {
  id: string;
  title: string;
  items: MealItem[];
}

const SmartCalculatorScreen: React.FC<{ onNavigate: (v: ViewType) => void, user: UserProfile | null }> = ({ onNavigate, user }) => {
  const [goal, setGoal] = useState<'perder' | 'ganar'>('ganar');
  const [mealPlan, setMealPlan] = useState<'2_ayuno' | '3' | '5'>('3');

  const CONVERSION = {
    POLLO: { p: 23, c: 0, f: 1.5 },
    ARROZ: { p: 7, c: 78, f: 0.5 },
    AGUACATE: { p: 1.5, c: 6, f: 15 },
  };

  const dailyTargets = useMemo(() => {
    const weight = user?.weight || 75;
    const isVolumen = goal === 'ganar';
    const proteinTarget = Math.round(weight * (isVolumen ? 2.2 : 2.6));
    const calories = isVolumen ? Math.round(weight * 38) : Math.round(weight * 27);
    const fatTarget = Math.round((calories * 0.25) / 9);
    const carbTarget = Math.round((calories - (proteinTarget * 4) - (fatTarget * 9)) / 4);
    return { proteinTarget, carbTarget, fatTarget, calories };
  }, [user, goal]);

  const meals = useMemo((): MealGroup[] => {
    const numMeals = mealPlan === '2_ayuno' ? 2 : mealPlan === '5' ? 5 : 3;
    const { proteinTarget, carbTarget, fatTarget } = dailyTargets;
    const pPerMeal = proteinTarget / numMeals;
    const cPerMeal = carbTarget / numMeals;
    const fPerMeal = fatTarget / numMeals;

    return Array.from({ length: numMeals }).map((_, i) => ({
      id: `m${i+1}`,
      title: `COMIDA ${i+1}`,
      items: [
        { name: 'Proteína (Animal/Vegetal)', amount: `${Math.round((pPerMeal/23)*100)}g`, p: Math.round(pPerMeal), c: 0, f: 2 },
        { name: 'Carbohidratos (Arroz/Avena)', amount: `${Math.round((cPerMeal/78)*100)}g`, p: 4, c: Math.round(cPerMeal), f: 1 },
        { name: 'Grasas (Aguacate/Nueces)', amount: `${Math.round((fPerMeal/15)*100)}g`, p: 0, c: 2, f: Math.round(fPerMeal) }
      ]
    }));
  }, [dailyTargets, mealPlan]);

  const planTotals = useMemo(() => {
    let p = 0, c = 0, f = 0;
    meals.forEach(m => m.items.forEach(it => { p += it.p; c += it.c; f += it.f; }));
    return { p, c, f };
  }, [meals]);

  const renderMacroCard = (label: string, current: number, target: number, accentColor: string, tintBg: string, textColor: string) => {
    const percentage = Math.min(100, Math.max(5, (current / target) * 100));
    return (
      <div className="relative flex-1 aspect-[0.85/1] rounded-[48px] border border-white/5 overflow-hidden bg-[#16272b] flex flex-col items-center justify-center shadow-2xl">
        <div 
          className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out ${tintBg}`}
          style={{ height: `${percentage}%` }}
        ></div>
        <div className="relative z-10 flex flex-col items-center">
          <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 ${textColor}`}>{label}</p>
          <div className="flex flex-col items-center gap-1">
             <p className="text-4xl font-[900] italic tracking-tighter text-white leading-none">{current}<span className="text-xl">g</span></p>
             <div className={`h-1 w-8 rounded-full ${accentColor} shadow-[0_0_12px_rgba(255,255,255,0.4)]`}></div>
          </div>
          <p className="text-[8px] font-black text-white/30 mt-3 uppercase tracking-widest">META: {target}G</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a1618] h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-4 flex items-center shrink-0">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400 p-2 mr-2 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <h2 className="text-3xl font-[900] italic uppercase tracking-tighter leading-none">PLANNER<br/>NUTRICIONAL</h2>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-44">
        <section className="flex gap-3 mt-4 mb-8">
          {renderMacroCard('PROTEÍNA', planTotals.p, dailyTargets.proteinTarget, 'bg-blue-400', 'bg-blue-500/20', 'text-blue-400')}
          {renderMacroCard('CARBOS', planTotals.c, dailyTargets.carbTarget, 'bg-green-400', 'bg-green-500/20', 'text-green-400')}
          {renderMacroCard('GRASAS', planTotals.f, dailyTargets.fatTarget, 'bg-orange-400', 'bg-orange-500/20', 'text-orange-400')}
        </section>

        <section className="bg-[#0c1618] p-1.5 rounded-[32px] flex border border-white/5 mb-8 shadow-inner">
          <button onClick={() => setGoal('perder')} className={`flex-1 py-4 rounded-[28px] text-[11px] font-black uppercase tracking-widest transition-all ${goal === 'perder' ? 'bg-primary text-background-dark shadow-glow' : 'text-gray-600'}`}>DÉFICIT</button>
          <button onClick={() => setGoal('ganar')} className={`flex-1 py-4 rounded-[28px] text-[11px] font-black uppercase tracking-widest transition-all ${goal === 'ganar' ? 'bg-primary text-background-dark shadow-glow' : 'text-gray-600'}`}>VOLUMEN</button>
        </section>

        <div className="flex flex-col gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-[#16272b]/40 rounded-[48px] p-8 border border-white/5 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-primary text-xl font-black italic tracking-tighter uppercase">{meal.title}</h4>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">PLANIFICADO</span>
              </div>
              <div className="flex flex-col gap-3">
                {meal.items.map((item, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-[24px] p-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-200 uppercase">{item.name}</p>
                      <p className="text-[10px] text-primary font-black italic">{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SmartCalculatorScreen;
