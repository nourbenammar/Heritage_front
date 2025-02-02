"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cuboid, History } from "lucide-react";
import { ReconstructionModal } from "./ReconstructionModal";

export default function Reconstruction() {
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the data from the backend
    async function fetchArtifacts() {
      try {
        const response = await fetch('http://127.0.0.1:5000/objects/get-all-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setArtifacts(data);
        } else {
          console.error("No artifacts found or invalid data format");
        }
      } catch (error) {
        console.error('Error fetching artifacts:', error);
      }
    }
    

    fetchArtifacts();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleGenerateClick = (artifact: any) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-serif text-amber-100">
          Reconstruction 3D
        </h1>
        <p className="text-lg text-amber-200/80">
          Découvrez et reconstruisez les artefacts anciens de Sbiba
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {artifacts.map((artifact) => (
            <Card
              key={artifact.id}
              className="group bg-stone-900/50 border-amber-900/20 hover:bg-stone-900/80 transition-all duration-500"
            >
              <div className="p-6 space-y-4">
                <header className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-amber-900/20 flex items-center justify-center">
                    <Cuboid className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-amber-100">
                      {artifact.titre}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-amber-200/60 mt-1">
                      <History className="w-4 h-4" />
                      <span>{artifact.figure}</span>
                    </div>
                  </div>
                </header>

                <div className="space-y-3">
                  <p className="text-sm text-amber-200/60">
                    {/* Limit the description to a certain length and add ellipsis if it exceeds */}
                    {artifact.description.length > 150
                      ? `${artifact.description.slice(0, 100)}...`
                      : artifact.description}
                  </p>
                </div>


                <button
                  onClick={() => handleGenerateClick(artifact)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-amber-900/20 hover:bg-amber-900/40 text-amber-100 rounded-lg transition-colors"
                >
                  <Cuboid className="w-4 h-4" />
                  Générer un modèle 3D
                </button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <ReconstructionModal
        artifact={selectedArtifact}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
