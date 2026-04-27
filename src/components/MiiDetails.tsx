"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  MoveHorizontal, 
  MoveVertical, 
  Scaling, 
  RotateCcw,
  Palette,
  Eye,
  Smile,
  CircleUser,
  Heart,
  ChevronLeft
} from "lucide-react";

type ViewMode = "A" | "B" | "C";

interface MiiDetailsProps {
  mii: {
    id: string;
    name: string;
    series: string | null;
    imageUrl: string | null;
    basicImageUrl: string | null;
    proInstructions: string | null;
  };
  isLiked?: boolean;
}

export default function MiiDetails({ mii, isLiked = false }: MiiDetailsProps) {
  const { data: session } = useSession();
  const [view, setView] = useState<ViewMode>("A");
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    if (!session) {
      alert("Debes iniciar sesión con Google para dar Like.");
      return;
    }
    setLiked(!liked);
  };

  // Mock parsed instructions for View C (in a real app, this would be parsed from mii.proInstructions JSON)
  const mockProInstructions = [
    { part: "Cara", icon: <CircleUser size={28} />, details: "Forma 1, Color 2, Arrugas No" },
    { part: "Ojos", icon: <Eye size={28} />, details: "Tipo 4, Color Verde", adjustments: [
      { icon: <MoveVertical size={18} />, val: "+2" },
      { icon: <MoveHorizontal size={18} />, val: "0" },
      { icon: <Scaling size={18} />, val: "Max" },
      { icon: <RotateCcw size={18} />, val: "-1" }
    ]},
    { part: "Boca", icon: <Smile size={28} />, details: "Tipo 12, Color Naranja", adjustments: [
      { icon: <MoveVertical size={18} />, val: "-1" },
      { icon: <Scaling size={18} />, val: "Normal" }
    ]},
    { part: "Pelo", icon: <Palette size={28} />, details: "Tipo 33, Color Marrón oscuro" }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/galeria">
          <button className="bg-tomodachi-card px-6 py-3 rounded-full shadow-bubble flex items-center gap-2 font-black text-lg transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active text-tomodachi-text border-4 border-transparent hover:border-white">
            <ChevronLeft size={24} className="text-tomodachi-accent" />
            Volver
          </button>
        </Link>
      </div>

      {/* Header and Toggles */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div className="bg-tomodachi-card px-8 py-4 rounded-full shadow-bubble flex items-center gap-4">
          <h1 className="text-3xl font-black text-tomodachi-text">{mii.name}</h1>
          {mii.series && (
            <span className="bg-tomodachi-bg px-3 py-1 rounded-full text-sm font-bold text-tomodachi-text/70 border-2 border-tomodachi-text/10">
              {mii.series}
            </span>
          )}
          
          {/* Like Button */}
          <button 
            onClick={handleLike}
            className={`ml-4 p-3 rounded-full shadow-bubble transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active ${
              liked ? 'bg-pink-500 text-white' : 'bg-tomodachi-bg text-tomodachi-text/40 hover:text-pink-500'
            }`}
          >
            <Heart fill={liked ? "currentColor" : "none"} size={24} />
          </button>
        </div>

        {/* View Switcher */}
        <div className="bg-tomodachi-card p-2 rounded-full shadow-bubble flex gap-2">
          {(["A", "B", "C"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-6 py-2 rounded-full font-black text-lg transition-all ${
                view === mode 
                  ? "bg-tomodachi-accent text-white shadow-inner" 
                  : "hover:bg-tomodachi-bg text-tomodachi-text"
              }`}
            >
              {mode === "A" ? "Imagen" : mode === "B" ? "Básico" : "Pro"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-tomodachi-card rounded-5xl shadow-bubble p-6 md:p-10 flex flex-col md:flex-row gap-8 relative overflow-hidden">
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{
               backgroundImage: "repeating-radial-gradient(circle at 0 0, transparent 0, #001A33 10px, transparent 20px)",
               backgroundSize: "40px 40px"
             }}
        />

        {/* Left Side: Avatar (Always visible, size changes based on mode) */}
        <div className={`relative z-10 transition-all duration-500 ease-in-out flex-shrink-0 ${
          view === "A" ? "w-full md:w-1/2 mx-auto" : "w-full md:w-1/3"
        }`}>
          <div className="aspect-square bg-tomodachi-bg rounded-4xl shadow-inner flex items-center justify-center p-4 border-4 border-white/50">
            {mii.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mii.imageUrl} alt={mii.name} className="w-full h-full object-contain drop-shadow-xl" />
            ) : (
              <div className="text-center">
                <CircleUser size={120} className="mx-auto text-tomodachi-text/20 mb-4" />
                <span className="font-bold text-tomodachi-text/50 text-xl">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Details (Visible in B and C) */}
        {view !== "A" && (
          <div className="relative z-10 flex-1 flex flex-col bg-tomodachi-bg rounded-4xl p-6 shadow-inner overflow-y-auto max-h-[600px] border-2 border-white/50">
            
            {view === "B" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <span className="bg-tomodachi-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">ℹ</span>
                  Detalles Básicos
                </h3>
                {mii.basicImageUrl ? (
                  <div className="w-full bg-white rounded-3xl p-2 shadow-sm border-2 border-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mii.basicImageUrl} alt={`Componentes de ${mii.name}`} className="w-full h-auto rounded-2xl" />
                  </div>
                ) : (
                  <p className="text-lg font-bold text-tomodachi-text/80 bg-white p-6 rounded-3xl shadow-sm border-2 border-transparent text-center">
                    Este Mii no tiene imagen de detalles básicos registrada.
                  </p>
                )}
              </div>
            )}

            {view === "C" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <span className="bg-[#4A90E2] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">⚙</span>
                  Instrucciones Pro
                </h3>
                
                <div className="flex flex-col gap-4">
                  {mockProInstructions.map((inst, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center border-2 border-transparent hover:border-[#4A90E2]/50 transition-colors">
                      {/* Icon */}
                      <div className="bg-tomodachi-bg p-3 rounded-full text-tomodachi-text/70 shadow-inner">
                        {inst.icon}
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1">
                        <span className="font-black text-lg block">{inst.part}</span>
                        <span className="font-bold text-tomodachi-text/60">{inst.details}</span>
                      </div>

                      {/* Adjustments (D-pad icons) */}
                      {inst.adjustments && (
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0 bg-tomodachi-bg px-4 py-2 rounded-2xl shadow-inner">
                          {inst.adjustments.map((adj, i) => (
                            <div key={i} className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl shadow-sm text-sm font-bold">
                              <span className="text-[#E86A17]">{adj.icon}</span>
                              <span>{adj.val}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
