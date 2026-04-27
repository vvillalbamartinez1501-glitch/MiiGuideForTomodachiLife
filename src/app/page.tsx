export default function Home() {
  // Placeholder data for the Mii cards
  const miis = [
    { id: 1, name: "jefazo", nature: "Alegre", color: "bg-red-400" },
    { id: 2, name: "divinidad", nature: "Serio", color: "bg-blue-400" },
    { id: 3, name: "capitán", nature: "Normal", color: "bg-green-400" },
    { id: 4, name: "alteza", nature: "Peculiar", color: "bg-purple-400" },
    { id: 5, name: "jefaza", nature: "Alegre", color: "bg-pink-400" },
    { id: 6, name: "mandamás", nature: "Serio", color: "bg-orange-400" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
      
      {/* Header */}
      <header className="w-full max-w-4xl px-6 py-6 mt-4 flex justify-between items-center">
        <div className="bg-tomodachi-card px-8 py-3 rounded-full shadow-bubble flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
          <h1 className="text-2xl font-black tracking-tight text-tomodachi-text">Guía de Miis</h1>
        </div>
        
        <div className="flex gap-4">
          <button className="bg-tomodachi-card hover:bg-tomodachi-card-hover px-6 py-3 rounded-full shadow-bubble font-bold transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
            Opciones
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-4xl flex flex-col items-center mt-12 px-6">
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
            <button className="bg-tomodachi-accent text-white px-8 py-4 rounded-full shadow-bubble text-xl font-bold transition-all hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
              Subir Mii
            </button>
            <button className="bg-tomodachi-card px-8 py-4 rounded-full shadow-bubble text-xl font-bold border-4 border-tomodachi-bg transition-all hover:bg-tomodachi-card-hover hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active">
              Explorar
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Miis */}
      <section className="w-full max-w-5xl px-6 mt-16">
        <h3 className="text-2xl font-black mb-8 text-center bg-tomodachi-card inline-block px-8 py-2 rounded-full shadow-bubble mx-auto flex w-max">
          Miis Recientes
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
          {miis.map((mii) => (
            <div 
              key={mii.id} 
              className="bg-tomodachi-card p-4 rounded-4xl shadow-bubble flex flex-col items-center transition-transform hover:-translate-y-2 cursor-pointer group"
            >
              {/* Image Placeholder */}
              <div className={`w-full aspect-square rounded-3xl ${mii.color} flex items-center justify-center mb-4 shadow-inner opacity-80 group-hover:opacity-100 transition-opacity`}>
                <span className="font-bold text-white text-lg bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  Imagen Mii
                </span>
              </div>
              
              {/* Mii Info */}
              <div className="w-full bg-tomodachi-bg rounded-full py-2 px-4 text-center border-2 border-transparent group-hover:border-tomodachi-accent transition-colors">
                <span className="font-bold text-xl block">{mii.name}</span>
              </div>
              
              {/* Tiny nature badge */}
              <div className="mt-3 flex gap-1">
                <span className="w-4 h-4 rounded-full bg-tomodachi-accent-green inline-block"></span>
                <span className="text-sm font-bold text-tomodachi-text/60 uppercase tracking-widest">{mii.nature}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
