// src/app/(features)/heritage-hunt/page.tsx
"use client";

import { useState } from "react";
import { CameraModal } from "./CameraModal";
import { DiscoveryPath } from "./DiscoveryPath";
import { ElementDetails } from "./ElementDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Camera, LockIcon } from "lucide-react";
import { heritageElements } from "@/lib/data/heritage-elements";

export default function HeritageHunt() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filter, setFilter] = useState<"tout" | "verrouillé" | "déverrouillé">("tout");
  const [elements, setElements] = useState(heritageElements);

  const filteredElements = elements.filter((element) => {
    if (filter === "tout") return true;
    return filter === "déverrouillé" ? element.unlocked : !element.unlocked;
  });

  const unlockElement = (id: string) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, unlocked: true } : element
      )
    );
    setSelectedElement((prev) =>
      prev?.id === id ? { ...prev, unlocked: true } : prev
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="h-[40vh] relative bg-gradient-to-b from-stone-900 to-transparent">
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="space-y-4">
            <h1 className="text-5xl font-serif text-amber-100">
            Découvrez Sbiba
</h1>
            <p className="text-xl text-amber200/80 max-w-2xl">
            Découvrez les trésors cachés de l'ancienne Sufetula
</p>
            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
              {["tout", "verrouillé", "déverrouillé"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilter(option as "tout" | "verrouillé" | "déverrouillé");
                    setSelectedElement(null); // Close details when filter changes
                  }}
                  className={`
                    px-6 py-3 rounded-lg border-2
                    ${
                      filter === option
                        ? "border-amber-500 bg-amber-900/80 text-amber-100 shadow-lg shadow-amber-500/20"
                        : "border-amber-500/30 bg-transparent text-amber-500/80 hover:bg-amber-900/40"
                    }
                    font-serif text-lg transition-all duration-300
                    hover:scale-105 active:scale-95
                    uppercase tracking-wide
                  `}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-[20px]">
        {/* Discovery Timeline/Path */}
        <DiscoveryPath
          elements={filteredElements}
          onElementSelect={setSelectedElement}
          selectedElement={selectedElement}
        />

        {/* Selected Element Details */}
        {selectedElement && (
          <div className="mt-[30px]">
            <ElementDetails
              element={selectedElement}
              onScan={() => setIsCameraOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Camera Modal */}
      <CameraModal
        open={isCameraOpen}
        onOpenChange={setIsCameraOpen}
        selectedElement={selectedElement}
        onUnlockElement={() => unlockElement(selectedElement?.id)}
      />
    </div>
  );
}
