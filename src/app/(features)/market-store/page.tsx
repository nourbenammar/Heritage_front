"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Loader2, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@mui/material';

const products = [
  {
    id: 1,
    title: "Tableau à l'huile Tunisie",
    description: "Un magnifique Tableau peinture acrylique taille 110/60 Fait à la main par de talents tunisiens. Ces tableaux repennent les architectures des maisons tunisiennes donnant un décor éblouissant à votre maison.",
    price: "500 points",
    image: "/Tunisia/tableau1.jpg",
    category: "Artisanat",
  },
  {
    id: 2,
    title: "La balgha",
    description: "belgha ou belga, est une chaussure en cuir qui fait partie des costumes traditionnels du Maghreb.",
    price: "150 points",
    image: "/Tunisia/souv2.png",
    category: "Produits du terroir",
  },
  {
    id: 3,
    title: "Poterie",
    description: "Poterie artisanale articles en terre cuite artisanale tunisienne incarnent à la perfection l'élégance méditerranéenne et le savoir-faire traditionnel.",
    price: "100 points",
    image: "/Tunisia/ceramic2.jpg",
    category: "Artisanat",
  },
  {
    id: 4,
    title: "Margoum",
    description: "Le margoum ou mergoum est un tissage de laine utilisé comme tapis de sol dont les origines sont arabo-berbères.",
    price: "500 points",
    image: "/Tunisia/tapis4.jpg",
    category: "Artisanat",
  },
  {
    id: 5,
    title: "Mdhalla",
    description: "Chapeau de plage traditionnel M’Dhala fabriqué à partir de matériaux naturels et tissée à la main, créé à partir des feuilles de palmiers, qui associe l’aspect traditionnel du chapeau à la touche moderne par des Harejs multi couleurs.",
    price: "250 points",
    image: "/Tunisia/souv6.png",
    category: "Artisanat",
  },
  {
    id: 6,
    title: "Tableau Sidi Bou Said",
    description: "Tableau peinture acrylique taille 110/60 Fait à la main par de talents tunisiens. Ces tableaux repennent les architectures des maisons tunisiennes donnant un décor éblouissant à votre maison.",
    price: "350 points",
    image: "/Tunisia/tableau3.jpg",
    category: "Artisanat",
  },
  {
    id: 7,
    title: "Kholkhal",
    description: "Le Kholkhal ne se porte pas au niveau des poignets mais au niveau des chevilles. Donc bracelets de pieds, les kholkhal sont issus de la culture berbère.",
    price: "250 points",
    image: "/Tunisia/acc2.jpg",
    category: "Artisanat",
  },
  {
    id: 8,
    title: "Poterie",
    description: "Articles en terre cuite artisanale tunisienne incarnent à la perfection l'élégance méditerranéenne et le savoir-faire traditionnel.",
    price: "100 points",
    image: "/Tunisia/ceramic1.jpeg",
    category: "Artisanat",
  },
  {
    id: 9,
    title: "Tableau à l'huile Tunisie",
    description: "Tableau peinture acrylique taille 110/60 Fait à la main par de talents tunisiens. Ces tableaux repennent les architectures des maisons tunisiennes donnant un décor éblouissant à votre maison.",
    price: "450 points",
    image: "/Tunisia/tableau5.jpg",
    category: "Artisanat",
  },

];

export default function MarketStore({ handlePurchase, points }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container mx-auto p-6 space-y-10">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl font-serif text-amber-200 drop-shadow-lg">
          Boutique Touristique de Tunisie
        </h1>
        <p className="text-lg text-amber-300/80 max-w-2xl mx-auto">
          Découvrez une sélection unique de produits artisanaux tunisiens. Chaque pièce raconte une histoire !
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group bg-stone-900/70 border border-amber-900/40 shadow-lg hover:bg-stone-900/90 transition-all duration-500 cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="p-5 space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-amber-100">{product.title}</h3>
                <p className="text-sm text-amber-200/80 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between text-lg text-amber-400 font-bold">
                  <span>{product.price}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Product Modal */}
      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl bg-stone-950 border-amber-900/40 rounded-lg p-6">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-serif text-amber-100">
                  {selectedProduct.title}
                </DialogTitle>
                <DialogDescription className="text-amber-200/80">
                  {selectedProduct.category} • {selectedProduct.price} 🪙
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full md:w-1/2 rounded-lg shadow-lg"
                />
                <p className="text-amber-200 text-lg">{selectedProduct.description}</p>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => setSelectedProduct(null)}
                >
                  Fermer
                </button>
                <button
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => setSelectedProduct(null)}
                >
                  Acheter
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
