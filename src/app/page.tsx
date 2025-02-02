import { Card } from "@/components/ui/card";
import { Scroll, Cuboid, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl space-y-12">
        {/* Virtual Visit Button */}
        <div className="flex justify-center">
          <Link href="/virtual-museum">
            <button className="relative bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105">
              Visite Virtuelle
              {/* Dynamic Glow Effect */}
              <span className="absolute top-0 left-0 w-full h-full rounded-full bg-amber-400 opacity-20 blur-lg animate-pulse"></span>
            </button>
          </Link>
        </div>

        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-serif text-amber-100">
            Sbiba Heritage AI
          </h1>
          <p className="text-xl text-amber-200/80">
            Redonner vie à l'histoire ancienne grâce à l'intelligence artificielle
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/movie-generation">
            <Card className="group h-[300px] bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-6 cursor-pointer">
              <Scroll className="w-16 h-16 text-amber-600" />
              <div className="text-center">
                <h2 className="text-2xl font-serif text-amber-100 mb-2">
                  Génération de films historiques
                </h2>
                <p className="text-amber-200/60">
                  Transformez les sites anciens en expériences cinématographiques
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/reconstruction">
            <Card className="group h-[300px] bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-6 cursor-pointer">
              <Cuboid className="w-16 h-16 text-amber-600" />
              <div className="text-center">
                <h2 className="text-2xl font-serif text-amber-100 mb-2">
                  Reconstruction 3D
                </h2>
                <p className="text-amber-200/60">
                  Donnez vie aux artefacts anciens
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/colorization">
            <Card className="group h-[300px] bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-6 cursor-pointer">
              <MessageSquare className="w-16 h-16 text-amber-600" />
              <div className="text-center">
                <h2 className="text-2xl font-serif text-amber-100 mb-2">
                  Colorisation d’images
                </h2>
                <p className="text-amber-200/60">
                  Découvrez les artefacts de Sbiba en couleurs éclatantes grâce à l’amélioration par IA
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="group h-[300px] bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-6 cursor-pointer">
              <MessageSquare className="w-16 h-16 text-amber-600" />
              <div className="text-center">
                <h2 className="text-2xl font-serif text-amber-100 mb-2">
                  Assistant archéologique
                </h2>
                <p className="text-amber-200/60">
                  Explorez l’histoire à travers la conversation
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
