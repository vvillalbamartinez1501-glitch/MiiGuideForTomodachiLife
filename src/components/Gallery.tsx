"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";

export type MiiItem = {
  id: string;
  name: string;
  series: string | null;
  imageUrl: string | null;
  type: string;
  authorId: string;
};

interface GalleryProps {
  initialMiis: MiiItem[];
}

const CATEGORIES = ["Todos", "Anime", "Ficción", "Celebridad", "Original"];

export default function Gallery({ initialMiis }: GalleryProps) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("Todos");

  const handleProtectedAction = (action: string) => {
    if (!session) {
      alert(`Debes iniciar sesión con Google para ${action === 'like' ? 'dar Like' : 'guardar este Mii'}.`);
      return;
    }
    // Lógica real en el futuro
    alert(`¡Acción '${action}' registrada para usuario logueado!`);
  };

  // Filter logic
  const filteredMiis = initialMiis.filter((mii) => {
    const matchesSearch = 
      mii.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (mii.series && mii.series.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = activeType === "Todos" || mii.type === activeType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      
      {/* Controls: Search and Filters */}
      <div className="bg-tomodachi-card p-6 rounded-4xl shadow-bubble mb-8 flex flex-col md:flex-row gap-6">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-tomodachi-text/50" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-tomodachi-bg rounded-full border-2 border-transparent focus:border-tomodachi-accent outline-none font-bold text-lg text-tomodachi-text transition-colors"
            placeholder="Buscar por nombre o serie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide items-center">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveType(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-bold shadow-bubble transition-all ${
                activeType === category
                  ? "bg-tomodachi-accent text-white hover:brightness-110 shadow-bubble-active translate-y-1"
                  : "bg-tomodachi-bg text-tomodachi-text hover:bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredMiis.length === 0 ? (
        <div className="text-center p-12 bg-tomodachi-card rounded-4xl shadow-bubble">
          <p className="text-2xl font-black text-tomodachi-text/50">No se encontraron Miis 😔</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMiis.map((mii) => (
            <div 
              key={mii.id} 
              className="bg-tomodachi-card p-4 rounded-4xl shadow-bubble flex flex-col items-center transition-transform hover:-translate-y-2 group"
            >
              {/* Image Placeholder or Actual Image */}
              <div className="w-full aspect-square rounded-3xl bg-tomodachi-wavy/50 flex items-center justify-center mb-4 shadow-inner overflow-hidden relative">
                {mii.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mii.imageUrl} alt={mii.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-tomodachi-text/50 text-sm bg-white/50 px-3 py-1 rounded-full">
                    Sin imagen
                  </span>
                )}
              </div>
              
              <div className="w-full bg-tomodachi-bg rounded-2xl py-2 px-3 text-center mb-4">
                <span className="font-black text-lg block truncate">{mii.name}</span>
                {mii.series && <span className="text-xs font-bold text-tomodachi-text/60 block truncate">{mii.series}</span>}
              </div>
              
              
              {/* Card Actions */}
              <div className="w-full mt-4 flex gap-2">
                <button 
                  onClick={() => handleProtectedAction("guardar")}
                  className="flex-1 bg-tomodachi-bg text-tomodachi-text/70 px-2 py-2 rounded-full shadow-inner font-bold transition-all hover:bg-tomodachi-accent hover:text-white"
                  title="Añadir a Mis Miis"
                >
                  <Bookmark size={18} className="mx-auto" />
                </button>
                <Link href={`/mii/${mii.id}`} className="flex-[3]">
                  <button className="w-full bg-tomodachi-secondary text-tomodachi-text px-4 py-2 rounded-full shadow-bubble font-bold transition-all hover:brightness-105 active:shadow-bubble-active active:translate-y-1 truncate">
                    Ver detalles
                  </button>
                </Link>
                <button 
                  onClick={() => handleProtectedAction("like")}
                  className="flex-1 bg-tomodachi-bg text-tomodachi-text/70 px-2 py-2 rounded-full shadow-inner font-bold transition-all hover:bg-pink-500 hover:text-white"
                  title="Dar Like"
                >
                  <Heart size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
