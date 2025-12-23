
import React, { useState } from 'react';
import { ViewType, UserProfile } from '../types';
import { GoogleGenAI, Type } from '@google/genai';

const AiPlanGeneratorScreen: React.FC<{ onNavigate: (v: ViewType) => void, user: UserProfile | null, onPlanGenerated: (plan: any[]) => void }> = ({ onNavigate, user, onPlanGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);
  const [planDays, setPlanDays] = useState<any[] | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const frequency = user?.frequency || 4;
      
      const prompt = `Actúa como un Entrenador de Hipertrofia de Élite. 
      Genera un protocolo de entrenamiento de EXACTAMENTE ${frequency} DÍAS para ${user?.name || 'el usuario'}. 
      Objetivo: ${user?.goal || 'Hipertrofia'}. Género: ${user?.gender}, Peso: ${user?.weight}kg.
      
      REGLAS DE VOLUMEN Y EJERCICIOS POR DÍA:
      - Si el usuario entrena 5 o 6 DÍAS: Cada día DEBE incluir entre 5 y 6 ejercicios seleccionados estratégicamente.
      - Si el usuario entrena 3 o 4 DÍAS: Aumenta la intensidad y el volumen ("DALE MÁS CAÑA"). Cada día DEBE incluir entre 7 y 8 ejercicios, priorizando multiarticulares pesados para maximizar el estímulo en menos sesiones.
      
      ESTRUCTURA DE DÍAS:
      - Usa esquemas Full-Body o PPL para 3-4 días.
      - Usa Arnold Split o PPL/Upper-Lower para 5-6 días.
      - Incluye técnicas avanzadas como TOP SET o MYO-REPS en al menos 1-2 ejercicios por sesión.
      
      Devuelve un objeto JSON válido con la estructura:
      {
        "summary": ["lista de 4 consejos estratégicos específicos para este volumen"],
        "days": [
          {
            "dayNumber": 1,
            "name": "DÍA 1",
            "focus": "ENFOQUE (Ej: PECHO & TRÍCEPS)",
            "exercises": [
              { "id": "uuid1", "name": "NOMBRE EJERCICIO", "subName": "SUB-NOMBRE", "zone": "ZONA", "sets": 4, "technique": "TOP SET", "lastWeight": 60 }
            ]
          }
        ]
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.ARRAY, items: { type: Type.STRING } },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayNumber: { type: Type.INTEGER },
                    name: { type: Type.STRING },
                    focus: { type: Type.STRING },
                    exercises: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          name: { type: Type.STRING },
                          subName: { type: Type.STRING },
                          zone: { type: Type.STRING },
                          sets: { type: Type.INTEGER },
                          technique: { type: Type.STRING },
                          lastWeight: { type: Type.NUMBER }
                        }
                      }
                    }
                  }
                }
              }
            },
            required: ["summary", "days"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from AI");
      
      const data = JSON.parse(text);
      if (data.days && Array.isArray(data.days) && data.days.length > 0) {
        setPlanDays(data.days);
        setSummary(data.summary || ["Plan generado con éxito"]);
        onPlanGenerated(data.days);
      } else {
        throw new Error("Invalid plan structure");
      }
    } catch (err) {
      console.error("Error generating plan:", err);
      alert("Hubo un problema al sintetizar el plan. Por favor, reintenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0a1618] h-screen overflow-hidden text-white font-display">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-white/5 bg-[#0a1618]/80 backdrop-blur-xl z-50">
        <button onClick={() => onNavigate('protocol_hub')} className="text-gray-400 p-2">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <div className="text-center">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">IA GENERATOR</p>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">PLAN REAL</h2>
        </div>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-32">
        {!planDays && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-10 animate-in fade-in duration-700">
            <div className="size-40 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/10 shadow-glow relative">
              <span className="material-symbols-outlined text-[80px] text-primary font-black italic">psychology</span>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin-slow opacity-30"></div>
            </div>
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">SÍNTESIS ESTRATÉGICA</h1>
              <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                Calculando volumen de entrenamiento óptimo para tu frecuencia de <span className="text-primary font-black">{user?.frequency || 4} días</span>.
              </p>
              { (user?.frequency || 4) < 5 && (
                <p className="mt-4 text-orange-400 text-[10px] font-black uppercase tracking-widest bg-orange-500/10 p-2 rounded-xl border border-orange-500/20">
                  ⚡ Baja frecuencia detectada: Aumentando intensidad por sesión.
                </p>
              )}
            </div>
            <button 
              onClick={generatePlan} 
              className="w-full bg-primary py-6 rounded-[24px] font-black text-xl text-black uppercase tracking-widest shadow-glow active:scale-95 transition-all italic"
            >
              GENERAR PROTOCOLO {user?.frequency || 4} DÍAS
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-10">
            <div className="relative size-32">
              <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-5xl animate-pulse">auto_awesome</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-primary font-black uppercase tracking-[0.3em] text-sm animate-pulse">Sincronizando volumen y frecuencia...</p>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Ajustando densidad mecánica por sesión</p>
            </div>
          </div>
        )}

        {planDays && (
          <div className="animate-in slide-in-from-bottom-8 duration-500">
             <div className="bg-[#16272b] rounded-[40px] p-8 border border-primary/20 shadow-glow mb-8">
                <div className="flex items-center gap-3 mb-6">
                   <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                   <h3 className="text-primary font-black uppercase italic text-2xl tracking-tighter">REPORTE IA</h3>
                </div>
                <ul className="flex flex-col gap-5">
                   {summary.map((s, i) => (
                     <li key={i} className="flex gap-4 text-sm text-gray-300 leading-snug">
                        <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                        <p className="font-medium italic">{s}</p>
                     </li>
                   ))}
                </ul>
             </div>
             
             <button 
                onClick={() => onNavigate('workout')} 
                className="w-full bg-primary py-6 rounded-[24px] font-black text-black uppercase tracking-widest shadow-glow flex items-center justify-center gap-3 active:scale-95 transition-all italic text-2xl"
             >
                INICIAR DÍA 1 AHORA
                <span className="material-symbols-outlined font-black">rocket_launch</span>
             </button>
             
             <button 
                onClick={() => setPlanDays(null)} 
                className="w-full mt-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                REGENERAR OTRA OPCIÓN
             </button>
          </div>
        )}
      </main>
      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AiPlanGeneratorScreen;
