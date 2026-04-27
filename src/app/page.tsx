import Gallery, { MiiItem } from "@/components/Gallery";

export default function Home() {
  // Mock data representing database fetch
  const mockMiis: MiiItem[] = [
    { id: "1", name: "Jefazo", series: "Tomodachi", imageUrl: null, type: "Original", authorId: "1" },
    { id: "2", name: "Goku", series: "Dragon Ball", imageUrl: null, type: "Anime", authorId: "1" },
    { id: "3", name: "Mario", series: "Super Mario Bros", imageUrl: null, type: "Ficción", authorId: "1" },
    { id: "4", name: "Will Smith", series: null, imageUrl: null, type: "Celebridad", authorId: "1" },
    { id: "5", name: "Zelda", series: "The Legend of Zelda", imageUrl: null, type: "Ficción", authorId: "1" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
      
      {/* App Header (Could be its own component later) */}
      <header className="w-full max-w-5xl px-6 py-6 mt-4 flex justify-between items-center mb-8">
        <div className="bg-tomodachi-card px-8 py-3 rounded-full shadow-bubble flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
          <h1 className="text-2xl font-black tracking-tight text-tomodachi-text">Guía de Miis</h1>
        </div>
        
        <div className="flex gap-4">
          <button className="bg-tomodachi-card text-tomodachi-accent hover:bg-tomodachi-card-hover px-6 py-3 rounded-full shadow-bubble font-bold transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Gallery component that handles filtering and search */}
      <Gallery initialMiis={mockMiis} />
      
    </main>
  );
}
