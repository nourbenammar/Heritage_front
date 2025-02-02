"use client";

import { useState, useEffect } from "react";
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

// Type definition for fetched data
type HistoricalImage = {
  id: number;
  title: string;
  figure: string;
  description: string;
  bwImage: string;
  colorImage: string;
  bwenImage: string;
  colorenhancedImage: string;
};

export default function Colorization() {
  const [historicalImages, setHistoricalImages] = useState<HistoricalImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<HistoricalImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchHistoricalImages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/coloration/get-all-data"); // Replace with your backend API endpoint
        const data = await response.json();
        setHistoricalImages(data);
      } catch (error) {
        console.error("Error fetching historical images:", error);
      }
    };
    fetchHistoricalImages();
  }, []);

  const handleEnhance = () => {
    setIsEnhancing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsEnhancing(false);
          setIsEnhanced(true); // Mark enhancement as done
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  // Function to handle image selection
  const handleImageSelect = (image: HistoricalImage) => {
    setSelectedImage(image);
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-serif text-amber-100">
          Colorisation d'images historiques
        </h1>
        <p className="text-lg text-amber-200/80 max-w-2xl mx-auto">
          Découvrez les artefacts de Sbiba en couleurs éclatantes grâce à l’amélioration par IA
        </p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historicalImages.map((image) => (
          <Card
            key={image.id}
            className="group bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500 cursor-pointer"
            onClick={() => handleImageSelect(image)}
          >
            <div className="p-4 space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={`/coloration/${image.figure}/before.jpeg`} // Dynamically generate the path for before image
                  alt={image.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-serif text-amber-100">
                    {image.titre}
                  </h3>
                  <span className="text-sm text-amber-500 font-mono">
                    {image.figure}
                  </span>
                </div>
                <p className="text-sm text-amber-200/60 line-clamp-2">
                  {image.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Colorization Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl bg-stone-950 border-amber-900/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-amber-100">
              {selectedImage?.title}
            </DialogTitle>
            <DialogDescription className="text-amber-200/60 font-mono">
              {selectedImage?.figure}
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-[2fr,1fr] gap-6">
            {/* Image Display Section */}
            <div className="space-y-4">
              {isProcessing || isEnhancing ? (
                // Loading Animation during processing/enhancement
                <div className="aspect-[4/3] bg-stone-900/50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
                    <div className="space-y-2 px-8">
                      <div className="text-amber-100">
                        {isProcessing ? "Image Colorization..." : "Enhancing Image..."}
                      </div>
                      <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-amber-200/60">{progress}% Complete</div>
                    </div>
                  </div>
                </div>
              ) : (
                selectedImage && (
                  <BeforeAfterSlider
                  beforeImage={!isEnhanced ? `/coloration/${selectedImage.figure}/before.jpg` : `/enhanced/${selectedImage.figure}/before.jpeg`}
                  afterImage={!isEnhanced ? `/coloration/${selectedImage.figure}/after.jpg` : `/enhanced/${selectedImage.figure}/after.jpeg`}
                  
                    className="border border-amber-900/20 rounded-lg overflow-hidden"
                  />
                )
              )}
            </div>

            {/* Details Section */}
            {selectedImage && (
              <div className="space-y-6">
                <p className="text-sm text-amber-200/60">{selectedImage.description}</p>

                <div className="flex items-center gap-2 text-xs text-amber-200/40">
                  <Info className="w-4 h-4" />
                  <span>
                    Faites glisser le curseur pour comparer les versions originale et améliorée
                  </span>
                </div>

                {/* Enhance Quality Button */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleEnhance}
                    className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition"
                    disabled={isEnhancing} // Disable button while enhancing
                  >
                    Améliorer la qualité
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
