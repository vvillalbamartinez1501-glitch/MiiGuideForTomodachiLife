"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Upload, FileImage, Settings, Check, Lock } from "lucide-react";

type UploadMode = "basic" | "pro";

export default function UploadForm() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<UploadMode>("basic");
  const [formData, setFormData] = useState({
    name: "",
    series: "",
    type: "Original",
    basicImageFile: null as File | null,
    proInstructions: "",
    imageFile: null as File | null,
  });

  if (!session) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 text-center">
        <div className="bg-tomodachi-card p-12 rounded-5xl shadow-bubble relative overflow-hidden flex flex-col items-center justify-center">
          <Lock size={64} className="text-tomodachi-text/30 mb-6" />
          <h2 className="text-3xl font-black mb-4 text-tomodachi-text">Acceso Restringido</h2>
          <p className="text-xl font-bold text-tomodachi-text/70 mb-8">
            Debes iniciar sesión con Google para poder subir tus propias creaciones de Miis a la guía.
          </p>
          <button className="bg-tomodachi-accent text-white px-8 py-4 rounded-full shadow-bubble text-xl font-bold transition-all hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const handleToggle = () => {
    setMode(mode === "basic" ? "pro" : "basic");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log("Submitting:", { mode, ...formData });
    alert("¡Mii subido correctamente! (Simulación)");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-tomodachi-card p-8 rounded-5xl shadow-bubble relative overflow-hidden">
        
        <h2 className="text-3xl font-black mb-8 text-center text-tomodachi-text flex items-center justify-center gap-3">
          <Upload className="text-tomodachi-accent" size={32} />
          Subir Nuevo Mii
        </h2>

        {/* Mode Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-tomodachi-bg p-2 rounded-full flex gap-2 shadow-inner border-2 border-white/50 relative">
            <button
              type="button"
              onClick={() => setMode("basic")}
              className={`px-8 py-3 rounded-full font-black text-lg transition-all flex items-center gap-2 z-10 ${
                mode === "basic" 
                  ? "bg-white text-tomodachi-text shadow-sm" 
                  : "text-tomodachi-text/50 hover:bg-white/50"
              }`}
            >
              <FileImage size={20} />
              Rápida (Vista B)
            </button>
            <button
              type="button"
              onClick={() => setMode("pro")}
              className={`px-8 py-3 rounded-full font-black text-lg transition-all flex items-center gap-2 z-10 ${
                mode === "pro" 
                  ? "bg-tomodachi-accent text-white shadow-bubble-active" 
                  : "text-tomodachi-text/50 hover:bg-white/50"
              }`}
            >
              <Settings size={20} />
              Pro (Vista C)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-tomodachi-text ml-4">Nombre del Mii</label>
              <input 
                type="text" 
                required
                className="bg-tomodachi-bg px-6 py-4 rounded-full border-2 border-transparent focus:border-tomodachi-accent outline-none font-bold text-lg text-tomodachi-text shadow-inner transition-colors"
                placeholder="Ej. Mario"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-tomodachi-text ml-4">Serie / Origen (Opcional)</label>
              <input 
                type="text" 
                className="bg-tomodachi-bg px-6 py-4 rounded-full border-2 border-transparent focus:border-tomodachi-accent outline-none font-bold text-lg text-tomodachi-text shadow-inner transition-colors"
                placeholder="Ej. Super Mario Bros"
                value={formData.series}
                onChange={(e) => setFormData({...formData, series: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-tomodachi-text ml-4">Categoría</label>
            <select 
              className="bg-tomodachi-bg px-6 py-4 rounded-full border-2 border-transparent focus:border-tomodachi-accent outline-none font-bold text-lg text-tomodachi-text shadow-inner appearance-none cursor-pointer"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Anime">Anime</option>
              <option value="Ficción">Ficción</option>
              <option value="Celebridad">Celebridad</option>
              <option value="Original">Original</option>
            </select>
          </div>

          {/* Image Upload Mock */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="font-bold text-tomodachi-text ml-4">Imagen Principal (Cara o QR)</label>
            <div className="border-4 border-dashed border-tomodachi-bg hover:border-tomodachi-accent rounded-4xl p-8 text-center cursor-pointer transition-colors bg-white/50">
              <FileImage className="mx-auto text-tomodachi-text/30 mb-4" size={48} />
              <p className="font-bold text-tomodachi-text/60 text-lg">Sube la imagen para la Vista A</p>
            </div>
          </div>

          {/* Conditional Fields based on Mode */}
          {mode === "basic" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6 bg-[#E86A17]/10 p-6 rounded-4xl border-2 border-[#E86A17]/20">
              <h3 className="font-black text-xl text-tomodachi-text mb-4 flex items-center gap-2">
                <FileImage className="text-[#E86A17]" />
                Imagen de Detalles Básicos
              </h3>
              <p className="font-bold text-tomodachi-text/70 mb-4 ml-2 text-sm">
                Sube una segunda captura que muestre los componentes usados (para la Vista B).
              </p>
              <div className="border-4 border-dashed border-[#E86A17]/30 hover:border-[#E86A17] rounded-3xl p-6 text-center cursor-pointer transition-colors bg-white/50">
                <FileImage className="mx-auto text-[#E86A17]/50 mb-2" size={32} />
                <p className="font-bold text-[#E86A17]/70">Subir imagen secundaria</p>
              </div>
            </div>
          )}

          {mode === "pro" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6 bg-[#4A90E2]/10 p-6 rounded-4xl border-2 border-[#4A90E2]/20">
              <h3 className="font-black text-xl text-[#001A33] mb-4 flex items-center gap-2">
                <Settings className="text-[#4A90E2]" />
                Instrucciones Pro
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-tomodachi-text ml-4">Instrucciones Paso a Paso (JSON / Formato)</label>
                  <p className="font-bold text-tomodachi-text/70 mb-2 ml-4 text-sm">
                    Escribe las instrucciones detalladas con posición, rotación, tamaño... para la Vista C.
                  </p>
                  <textarea 
                    className="bg-white px-6 py-4 rounded-3xl border-2 border-transparent focus:border-[#4A90E2] outline-none font-bold text-lg text-tomodachi-text shadow-inner min-h-[150px] resize-none"
                    placeholder='Ej: "Ojos: Mover 2 abajo, Tamaño máximo..."'
                    value={formData.proInstructions}
                    onChange={(e) => setFormData({...formData, proInstructions: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button 
              type="submit"
              className="bg-tomodachi-accent text-white px-10 py-4 rounded-full shadow-bubble text-xl font-black transition-all hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active flex items-center gap-2"
            >
              <Check size={24} />
              Publicar Mii
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
