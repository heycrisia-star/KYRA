
import React, { useState, useRef, useEffect } from 'react';
import { ViewType } from '../types';
import { GoogleGenAI } from '@google/genai';

const AiBotScreen: React.FC<{ onNavigate: (v: ViewType) => void }> = ({ onNavigate }) => {
  const [mode, setMode] = useState<'food' | 'body'>('food');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    stopCamera();
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    } catch (err) {
      console.error("Error accessing camera", err);
      setError("No se pudo acceder a la cámara. Por favor, asegúrate de dar permisos o usa la opción de subir foto.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        analyzeImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);

    const base64Image = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
    analyzeImage(base64Image);
  };

  const analyzeImage = async (base64Data: string) => {
    setIsScanning(true);
    setResult(null);
    setError(null);

    try {
      // Correct initialization of GoogleGenAI using strictly process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = mode === 'food' 
        ? "Analiza esta comida detalladamente. Estima: Calorías, proteínas, carbohidratos y grasas. Explica por qué es una buena (o mala) opción según el modo fitness. Responde en español con un tono profesional pero motivador."
        : "Analiza el físico o el ejercicio en esta foto. Evalúa el estado de forma, posibles mejoras en la postura o técnica, y da un veredicto de 'Status de Fuerza'. Responde en español como un entrenador de élite.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: prompt }
          ]
        }
      });

      setResult(response.text || "Gemini ha analizado la imagen pero no ha devuelto un veredicto claro.");
    } catch (err) {
      setError("Error al procesar la imagen con Gemini. Revisa tu conexión.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark relative overflow-hidden h-screen">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload}
      />

      <div className="flex-1 relative bg-black">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background-dark z-10">
            <span className="material-symbols-outlined text-red-500 text-6xl mb-4">no_photography</span>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-glow"
            >
              Subir de la Galería
            </button>
            <button onClick={startCamera} className="mt-4 text-primary text-xs font-bold uppercase underline">Reintentar Cámara</button>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
        
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 border-[40px] border-background-dark/80"></div>
          <div className="absolute inset-[40px] border-2 border-primary/20 rounded-3xl overflow-hidden">
            <div className="absolute top-4 left-0 w-full text-center">
              <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-primary/30">
                Deja que Gemini analice por ti
              </span>
            </div>
            {isScanning && (
              <div className="absolute inset-0 bg-primary/5">
                <div className="h-2 w-full bg-primary shadow-glow absolute top-0 animate-[scan_2.5s_infinite]"></div>
              </div>
            )}
          </div>
        </div>

        {/* UI Controls Overlay */}
        <div className="absolute top-8 left-0 w-full px-6 flex justify-between items-center z-30">
          <button onClick={() => onNavigate('dashboard')} className="size-12 rounded-full bg-background-dark/80 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-lg active:scale-90">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex bg-background-dark/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-lg">
            <button onClick={() => setMode('food')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'food' ? 'bg-primary text-black shadow-glow' : 'text-gray-500'}`}>Nutrición</button>
            <button onClick={() => setMode('body')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'body' ? 'bg-primary text-black shadow-glow' : 'text-gray-500'}`}>Fuerza/Físico</button>
          </div>
          <button onClick={toggleCamera} className="size-12 rounded-full bg-background-dark/80 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-lg active:scale-90">
            <span className="material-symbols-outlined">{facingMode === 'user' ? 'camera_rear' : 'camera_front'}</span>
          </button>
        </div>

        {/* Result Overlay */}
        {result && (
          <div className="absolute bottom-4 left-4 right-4 p-7 bg-card-dark/98 backdrop-blur-2xl rounded-[40px] border border-primary/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-12 duration-500 z-50">
            <div className="flex items-center justify-between mb-5">
               <div className="flex items-center gap-3 text-primary">
                 <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="material-symbols-outlined text-2xl animate-pulse">auto_awesome</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] block leading-none text-primary/60">Análisis Inteligente</span>
                    <span className="text-sm font-black uppercase tracking-tighter text-white">Gemini Coach Report</span>
                 </div>
               </div>
               <button onClick={() => setResult(null)} className="text-gray-500 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="max-h-[35vh] overflow-y-auto no-scrollbar mb-8 pr-1">
              <p className="text-gray-200 text-[15px] font-medium leading-relaxed whitespace-pre-wrap italic">"{result}"</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setResult(null)} className="flex-1 py-4.5 bg-white/5 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:bg-white/10 transition-colors">Descartar</button>
              <button 
                onClick={() => { 
                  setResult(null); 
                  onNavigate('dashboard'); 
                }} 
                className="flex-1 py-4.5 bg-primary rounded-2xl text-[10px] font-black uppercase text-black shadow-glow active:scale-95 transition-all"
              >
                Guardar en Log
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-40 bg-background-dark border-t border-white/5 flex items-center justify-between px-12 shrink-0 z-40">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="size-16 rounded-[24px] bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-white/10 active:scale-90"
          title="Galería"
        >
          <span className="material-symbols-outlined text-3xl">image</span>
        </button>
        
        <button 
          onClick={captureAndAnalyze}
          disabled={isScanning || !!error}
          className={`size-28 rounded-full border-4 border-primary p-1.5 transition-all active:scale-90 ${isScanning || error ? 'opacity-30 grayscale' : 'shadow-glow hover:scale-105'}`}
        >
          <div className="size-full rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-black text-4xl font-bold">{isScanning ? 'sync' : 'camera'}</span>
          </div>
        </button>

        <button 
          className="size-16 rounded-[24px] bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-90"
          title="Historial"
        >
          <span className="material-symbols-outlined text-3xl">history</span>
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .py-4\.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
      `}</style>
    </div>
  );
};

export default AiBotScreen;
