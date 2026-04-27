import Link from "next/link";
import { MiiItem } from "@/components/Gallery";

export default function Home() {
  // Mock data for featured Miis (only 4)
  const featuredMiis: MiiItem[] = [
    { id: "1", name: "Jefazo", series: "Tomodachi", imageUrl: null, type: "Original", authorId: "1" },
    { id: "2", name: "Goku", series: "Dragon Ball", imageUrl: null, type: "Anime", authorId: "1" },
    { id: "3", name: "Mario", series: "Super Mario Bros", imageUrl: null, type: "Ficción", authorId: "1" },
    { id: "4", name: "Will Smith", series: null, imageUrl: null, type: "Celebridad", authorId: "1" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
      
      {/* Header */}
      <header className="w-full max-w-5xl px-6 py-6 mt-4 flex justify-between items-center mb-4">
        <div className="bg-tomodachi-card px-8 py-3 rounded-full shadow-bubble flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
          <h1 className="text-2xl font-black tracking-tight text-tomodachi-text">Guía de Miis</h1>
        </div>
        
        <div className="flex gap-4">
          {/* We will later replace this with a dynamic auth component */}
          <button className="bg-tomodachi-card text-tomodachi-accent hover:bg-tomodachi-card-hover px-6 py-3 rounded-full shadow-bubble font-bold transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-4xl flex flex-col items-center mt-8 px-6">
        <div className="relative bg-tomodachi-card p-10 rounded-5xl shadow-bubble w-full max-w-2xl text-center overflow-hidden">
          {/* Wavy subtle background effect inside the card */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{
                 backgroundImage: "repeating-radial-gradient(circle at 0 0, transparent 0, #001A33 10px, transparent 20px)",
                 backgroundSize: "40px 40px"
               }}
          />
          
          <h2 className="text-4xl font-black mb-4 relative z-10 text-tomodachi-text">¿Qué te gustaría cambiar?</h2>
          <p className="text-xl mb-8 font-bold text-tomodachi-text/70 relative z-10">
            ¡Bienvenido a tu panel de creación!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/upload">
              <button className="w-full bg-tomodachi-accent text-white px-8 py-4 rounded-full shadow-bubble text-xl font-bold transition-all hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
                Subir Mii
              </button>
            </Link>
            <Link href="/galeria">
              <button className="w-full bg-tomodachi-card px-8 py-4 rounded-full shadow-bubble text-xl font-bold border-4 border-tomodachi-bg transition-all hover:bg-tomodachi-card-hover hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active text-tomodachi-text">
                Explorar
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Miis */}
      <section className="w-full max-w-5xl px-6 mt-16">
        <h3 className="text-3xl font-black mb-8 text-center text-tomodachi-text drop-shadow-md">
          Miis Destacados
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredMiis.map((mii) => (
            <div 
              key={mii.id} 
              className="bg-tomodachi-card p-4 rounded-4xl shadow-bubble flex flex-col items-center transition-transform hover:-translate-y-2 group"
            >
              {/* Image Placeholder */}
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
              
              <div className="w-full bg-tomodachi-bg rounded-2xl py-2 px-3 text-center mb-4 border-2 border-transparent group-hover:border-tomodachi-accent transition-colors">
                <span className="font-black text-lg block truncate">{mii.name}</span>
              </div>
              
              <Link href={`/mii/${mii.id}`} className="w-full">
                <button className="w-full bg-tomodachi-secondary text-tomodachi-text px-4 py-2 rounded-full shadow-bubble font-bold transition-all hover:brightness-105 active:shadow-bubble-active active:translate-y-1">
                  Ver detalles
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/galeria">
            <button className="bg-tomodachi-card border-4 border-tomodachi-accent px-10 py-5 rounded-full shadow-bubble text-2xl font-black transition-all hover:-translate-y-2 active:translate-y-0 active:shadow-bubble-active text-tomodachi-accent hover:bg-tomodachi-accent hover:text-white group">
              ¡Ver todos los Miis!
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
