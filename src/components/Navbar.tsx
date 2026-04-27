"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Bookmark, User as UserIcon, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full z-50 bg-tomodachi-bg shadow-sm border-b-2 border-tomodachi-text/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand/Logo */}
        <Link href="/">
          <div className="bg-tomodachi-card px-6 py-2 rounded-full shadow-bubble flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
            <h1 className="text-xl font-black tracking-tight text-tomodachi-text">Guía de Miis</h1>
          </div>
        </Link>

        {/* Center: Main Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">
            <span className="font-bold text-lg text-tomodachi-text/80 hover:text-tomodachi-accent transition-colors">Inicio</span>
          </Link>
          <Link href="/galeria">
            <span className="font-bold text-lg text-tomodachi-text/80 hover:text-tomodachi-accent transition-colors">Galería</span>
          </Link>
          {session && (
            <Link href="/mis-likes">
              <span className="font-bold text-lg text-tomodachi-text/80 hover:text-pink-500 transition-colors flex items-center gap-1">
                <Bookmark size={18} />
                Mis Miis
              </span>
            </Link>
          )}
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="font-bold text-sm text-tomodachi-text leading-tight">{session.user?.name}</p>
              </div>
              <div className="relative group cursor-pointer">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="User avatar" className="w-10 h-10 rounded-full border-2 border-tomodachi-accent shadow-inner" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-tomodachi-card border-2 border-tomodachi-accent flex items-center justify-center shadow-inner">
                    <UserIcon size={20} className="text-tomodachi-text" />
                  </div>
                )}
                
                {/* Dropdown (Simple) */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-2 border-tomodachi-text/10 p-2">
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 font-bold text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => signIn('google')}
              className="bg-tomodachi-card text-tomodachi-accent hover:bg-tomodachi-card-hover px-5 py-2 md:px-6 md:py-3 rounded-full shadow-bubble font-bold transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-bubble-active text-sm md:text-base"
            >
              Iniciar Sesión
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
