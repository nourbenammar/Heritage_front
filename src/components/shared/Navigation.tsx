"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Compass, Scroll, Cuboid, MessageSquare, Palette, Coins } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [points, setPoints] = useState(1200); // Dynamic points state

  const handlePurchase = (price) => {
    if (points >= price) {
      setPoints(points - price);
    } 
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-900/20 backdrop-blur-sm">
  <div className="px-4"> {/* Removed `container mx-auto` */}
    <div className="flex h-16 items-center justify-between">
    <Link href="/" className="flex items-center gap-6 group pl-2 whitespace-nowrap">
  <Compass className="w-8 h-8 text-amber-600 group-hover:text-amber-500 transition-colors" />
  <span className="text-2xl font-serif text-amber-100 group-hover:text-amber-50 transition-colors">
    Sbiba Heritage
  </span>
</Link>






          <nav className="flex items-center gap-8 flex-nowrap">
            <Link
              href="/movie-generation"
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-900/20 transition-all whitespace-nowrap",
                pathname === "/movie-generation" && "bg-amber-900/20 text-amber-100"
              )}
            >
              <Scroll className="w-4 h-4" />
              <span>Génération de films</span>
            </Link>

            <Link
              href="/reconstruction"
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-900/20 transition-all whitespace-nowrap",
                pathname === "/reconstruction" && "bg-amber-900/20 text-amber-100"
              )}
            >
              <Cuboid className="w-4 h-4" />
              <span>Reconstruction 3D</span>
            </Link>

            <Link
              href="/colorization"
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-900/20 transition-all whitespace-nowrap",
                pathname === "/colorization" && "bg-amber-900/20 text-amber-100"
              )}
            >
              <Palette className="w-4 h-4" />
              <span>Coloriation d'images</span>
            </Link>

            <Link
              href="/heritage-hunt"
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-900/20 transition-all whitespace-nowrap",
                pathname === "/heritage-hunt" && "bg-amber-900/20 text-amber-100"
              )}
            >
              <Compass className="w-4 h-4" />
              <span>Heritage Hunt</span>
            </Link>

            <Link
              href="/market-store"
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-900/20 transition-all whitespace-nowrap",
                pathname === "/market-store" && "bg-amber-900/20 text-amber-100"
              )}
            >
              <Compass className="w-4 h-4" />
              <span>Boutique</span>
            </Link>

            <Link
              href="/chat"
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-amber-200 hover:text-amber-100 hover:bg-amber-900/20 transition-all whitespace-nowrap",
                pathname === "/chat" && "bg-amber-900/20 text-amber-100"
              )}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Assistant Archéologique</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 bg-amber-900/20 px-4 py-2 rounded-lg shadow-md">
            <Coins className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-bold text-amber-100">{points}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
