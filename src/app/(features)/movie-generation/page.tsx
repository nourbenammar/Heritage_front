"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react";
import { GenerationModal } from "./GenerationModal";

// Mock data - we'll move this to a separate file later
const sites = [
  {
    id: "157",
    name: "Hr. Bou Mefteh",
    description: "Site antique arasé qui se compose de trois parties",
    videoPath: "/videos/hr.boumeftah.mp4",
  },
  {
    id: "004",
    name: "Aïn Jeljil",
    description: "Source avec captage antique",
    videoPath: "/videos/AïnJeljil.mp4",
  },
  {
    id: "290",
    name: "Amphithéâtre",
    description: "C'est une forme ovale allongée orientée est-ouest, dotée de deux ouvertures sur les extrémités occidentale et orientale.",
    videoPath: "/videos/amphithéâtre.mp4", // Path to the video for this site
  },
  {
    id: "119",
    name: "Hr. Gazouz",
    description: "A l'ouest de l'ancien parcours reliant Sbeitla à Rohia à environ 3 ou 4 km au sud-est.",
    videoPath: "/videos/gazouz.mp4", // Path to the video for this site
  },
  {
    id: "024",
    name: "Hr. Jedliane",
    description: "Superficie : environ 2 ha Site antique arasé situé à côté du collège de Jedliane.",
    videoPath: "/videos/Jedliane.mp4", // Path to the video for this site
  },
  {
    id: "189",
    name: "Hr. Tsmed",
    description: "C’est un site antique très étendu, composé de champs de ruines dispersées et formant quatre unité en gros",
    videoPath: "/videos/Hr.Tsmed.mp4", // Path to the video for this site
  },
  

  
];

export default function MovieGeneration() {
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateClick = (site: any) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-serif text-amber-100">
        Génération de films historiques
        </h1>
        <p className="text-lg text-amber-200/80">
          
Sélectionnez un site pour commencer votre voyage à travers le temps
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {sites.map((site) => (
            <Card
              key={site.id}
              className="group bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500"
            >
              <div className="p-6 space-y-4">
                <header className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-amber-900/20 flex items-center justify-center font-serif text-2xl text-amber-600">
                    {site.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-amber-100">
                      {site.name}
                    </h3>
                    <p className="text-sm text-amber-200/60">
                      {site.description}
                    </p>
                  </div>
                </header>

                <button
                  onClick={() => handleGenerateClick(site)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-amber-900/20 hover:bg-amber-900/40 text-amber-100 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Générer un film
                </button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <GenerationModal
        site={selectedSite}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
