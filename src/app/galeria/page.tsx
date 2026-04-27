import Gallery, { MiiItem } from "@/components/Gallery";

export default function GaleriaPage() {
  // Mock data representing database fetch for all Miis
  const mockMiis: MiiItem[] = [
    { id: "1", name: "Jefazo", series: "Tomodachi", imageUrl: null, type: "Original", authorId: "1" },
    { id: "2", name: "Goku", series: "Dragon Ball", imageUrl: null, type: "Anime", authorId: "1" },
    { id: "3", name: "Mario", series: "Super Mario Bros", imageUrl: null, type: "Ficción", authorId: "1" },
    { id: "4", name: "Will Smith", series: null, imageUrl: null, type: "Celebridad", authorId: "1" },
    { id: "5", name: "Zelda", series: "The Legend of Zelda", imageUrl: null, type: "Ficción", authorId: "1" },
    { id: "6", name: "Naruto", series: "Naruto", imageUrl: null, type: "Anime", authorId: "2" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pb-20 pt-10">
      <div className="w-full max-w-5xl px-6 mb-8 text-center">
        <h1 className="text-4xl font-black text-tomodachi-text bg-tomodachi-card inline-block px-10 py-4 rounded-full shadow-bubble">
          Explorar Galería
        </h1>
      </div>
      
      <Gallery initialMiis={mockMiis} />
    </main>
  );
}
