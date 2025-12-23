import React, { useState } from 'react';
import { ViewType, UserProfile } from '../types';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const AiPlanGeneratorScreen: React.FC<{ onNavigate: (v: ViewType) => void, user: UserProfile | null, onPlanGenerated: (plan: any[]) => void }> = ({ onNavigate, user, onPlanGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);
  // Plan states
  const [activeTab, setActiveTab] = useState<'workout' | 'nutrition'>('workout');
  const [planDays, setPlanDays] = useState<any[] | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<any[] | null>(null);

  // Nutrition specific
  const [mealFrequency, setMealFrequency] = useState<2 | 3 | 5>(3);

  const generatePlan = async () => {
    setLoading(true);
    setPlanDays(null);
    setNutritionPlan(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Falta VITE_GEMINI_API_KEY");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json"
        }
      });

      let prompt = '';
      let schema: any;

      if (activeTab === 'workout') {
        const frequency = user?.frequency || 4;
        prompt = `Actúa como un Entrenador de Hipertrofia de Élite. 
          Genera un protocolo de entrenamiento de EXACTAMENTE ${frequency} DÍAS para ${user?.name || 'el usuario'}. 
          Objetivo: ${user?.goal || 'Hipertrofia'}. Género: ${user?.gender}, Peso: ${user?.weight}kg.
          REGLAS: Si entrena 3-4 días, más intensidad (FullBody/PPL). Si 5-6, PPL/Arnold. Incluye técnicas avanzadas.
          
          Devuelve un JSON con: summary (array strings) y days (array objetos).`;

        schema = {
          type: SchemaType.OBJECT,
          properties: {
            summary: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            days: { type: SchemaType.ARRAY, items: { type: SchemaType.OBJECT, properties: { dayNumber: { type: SchemaType.INTEGER }, name: { type: SchemaType.STRING }, focus: { type: SchemaType.STRING }, exercises: { type: SchemaType.ARRAY, items: { type: SchemaType.OBJECT, properties: { id: { type: SchemaType.STRING }, name: { type: SchemaType.STRING }, subName: { type: SchemaType.STRING }, zone: { type: SchemaType.STRING }, sets: { type: SchemaType.INTEGER }, technique: { type: SchemaType.STRING }, lastWeight: { type: SchemaType.NUMBER } } } } } } }
          },
          required: ["summary", "days"]
        };
      } else {
        // NUTRITION LOGIC
        prompt = `Actúa como Nutricionista Deportivo de Élite.
         Genera un Plan Nutricional de 1 DÍA EJEMPLO para ${user?.name || 'Usuario'}. 
         Datos: Peso ${user?.weight}kg, Objetivo ${user?.goal || 'Mantener'}.
         
         REGLA FRECUENCIA: El usuario eligió ${mealFrequency} COMIDAS AL DÍA.
         Opciones Específicas:
         - Opción 2 Comidas: Ayuno + 2 Comidas Fuertes + Pre-entreno.
         - Opción 3 Comidas: Desayuno, Almuerzo, Cena.
         - Opción 5 Comidas: Frecuencia alta (snacks incluidos).

         REGLAS OBLIGATORIAS DE ALIMENTOS:
         1. La PRIMERA COMIDA DEL DÍA **SIEMPRE** DEBE INCLUIR: KEFIR y HUEVOS.
         2. Si es la opción de 2 comidas, la primera debe ser muy contundente (Huevos + Proteína Extra).
         3. Calcula CALORÍAS y MACROS (Proteína, Carbohidratos, Grasas) para cada comida base a su objetivo.
         4. Sé específico con las cantidades.

         Devuelve un JSON válido con: summary (array strings) y meals (array objetos).`;

        schema = {
          type: SchemaType.OBJECT,
          properties: {
            summary: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            meals: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  name: { type: SchemaType.STRING },
                  time: { type: SchemaType.STRING },
                  calories: { type: SchemaType.NUMBER },
                  macros: { type: SchemaType.STRING },
                  foods: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
                }
              }
            }
          },
          required: ["summary", "meals"]
        };
      }

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseSchema: schema
        }
      });

      const text = result.response.text();
      if (!text) throw new Error("No response from AI");

      const data = JSON.parse(text);
      if (activeTab === 'workout') {
        setPlanDays(data.days);
        onPlanGenerated(data.days);
      } else {
        setNutritionPlan(data.meals);
      }
      setSummary(data.summary || []);

    } catch (err: any) {
      console.error("Error generating plan:", err);
      alert(`Error IA: ${err.message || 'Verifica VITE_GEMINI_API_KEY'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a1618] h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-white/5 bg-[#0a1618]/80 backdrop-blur-xl z-50">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400 p-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
          <span className="text-[9px] font-bold text-gray-500 opacity-50">v2.0 (FIX)</span>
        </button>
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
          <button onClick={() => setActiveTab('workout')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'workout' ? 'bg-primary text-black shadow-glow' : 'text-gray-500'}`}>Entreno</button>
          <button onClick={() => setActiveTab('nutrition')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'nutrition' ? 'bg-primary text-black shadow-glow' : 'text-gray-500'}`}>Nutrición</button>
        </div>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-32">
        {!planDays && !nutritionPlan && !loading && (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-8 animate-in fade-in duration-700">

            {activeTab === 'workout' ? (
              <>
                <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/10 shadow-glow">
                  <span className="material-symbols-outlined text-[60px] text-primary font-black italic">fitness_center</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">DISEÑO DE BLOQUE</h1>
                  <p className="text-gray-500 text-xs max-w-xs mx-auto">Algoritmo de especialización de Hipertrofia.</p>
                </div>
              </>
            ) : (
              <>
                <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/10 shadow-glow">
                  <span className="material-symbols-outlined text-[60px] text-primary font-black italic">restaurant_menu</span>
                </div>
                <div>
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">PLAN NUTRICIONAL</h1>
                  <p className="text-gray-500 text-xs max-w-xs mx-auto">Cálculo metabólico adaptativo con IA.</p>
                </div>

                <div className="w-full bg-card-dark rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">SELECCIONA FRECUENCIA</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 5].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setMealFrequency(opt as any)}
                        className={`py-3 rounded-xl border ${mealFrequency === opt ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-transparent text-gray-500'} transition-all`}
                      >
                        <span className="block text-xl font-black italic">{opt}</span>
                        <span className="text-[8px] font-bold uppercase">Comidas</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-gray-500 mt-3 italic text-center">
                    {mealFrequency === 2 && "Ayuno Intermitente + 2 Comidas"}
                    {mealFrequency === 3 && "Estructura Clásica Equilibrada"}
                    {mealFrequency === 5 && "Metabolismo Activo (Snacks)"}
                  </p>
                </div>
              </>
            )}

            <button
              onClick={generatePlan}
              className="w-full bg-primary py-5 rounded-[20px] font-black text-lg text-black uppercase tracking-widest shadow-glow active:scale-95 transition-all italic"
            >
              GENERAR PLAN {activeTab === 'workout' ? 'ENTRENO' : 'NUTRICIONAL'}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <div className="relative size-20">
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-primary font-black uppercase tracking-widest text-xs animate-pulse">
              {activeTab === 'workout' ? 'Calculando Periodización...' : 'Optimizando Macros y Calorías...'}
            </p>
          </div>
        )}

        {/* WORKOUT RENDERER */}
        {planDays && activeTab === 'workout' && (
          <div className="animate-in slide-in-from-bottom-8">
            {/* Reuse existing workout renderer... (omitted for brevity, assume classic list) */}
            <div className="bg-card-dark p-6 rounded-3xl mb-4 border border-primary/20">
              <h3 className="text-primary font-black italic uppercase">Plan Generado</h3>
              <p className="text-gray-400 text-xs mt-2">Tu rutina se ha cargado en la sección de Entreno.</p>
            </div>
            <button onClick={() => onNavigate('workout')} className="w-full bg-primary py-4 rounded-xl font-black text-black uppercase">Ir a Entrenar</button>
          </div>
        )}

        {/* NUTRITION RENDERER */}
        {nutritionPlan && activeTab === 'nutrition' && (
          <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-8">
            {nutritionPlan.map((meal: any, idx: number) => (
              <div key={idx} className="bg-[#16272b] rounded-[32px] p-6 border border-white/5 relative group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{meal.time}</p>
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">{meal.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-white">{meal.calories} <span className="text-[10px] text-gray-500">KCAL</span></p>
                  </div>
                </div>

                <ul className="space-y-3 mb-4">
                  {meal.foods.map((food: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                      <div className="size-2 rounded-full bg-primary/50"></div>
                      <span className="text-sm font-medium text-gray-200">{food}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-white/5 rounded-xl p-3 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>{meal.macros}</span>
                  <span className="material-symbols-outlined text-sm">pie_chart</span>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      const newFoods = window.prompt("Edita los alimentos (separados por coma):", meal.foods.join(", "));
                      if (newFoods) {
                        const updatedMeals = [...nutritionPlan];
                        updatedMeals[idx].foods = newFoods.split(",").map(f => f.trim());
                        setNutritionPlan(updatedMeals);
                      }
                    }}
                    className="flex-1 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:bg-white/10 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      const updatedMeals = nutritionPlan.filter((_, i) => i !== idx);
                      setNutritionPlan(updatedMeals);
                    }}
                    className="px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setNutritionPlan(null)}
              className="py-4 text-xs font-black uppercase tracking-widest text-gray-500 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">refresh</span> Regenerar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AiPlanGeneratorScreen;
