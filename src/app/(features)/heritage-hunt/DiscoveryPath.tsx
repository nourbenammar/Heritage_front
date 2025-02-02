// src/app/(features)/heritage-hunt/DiscoveryPath.tsx
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Lock, Unlock } from "lucide-react";

interface DiscoveryPathProps {
  elements: HistoricalElement[];
  onElementSelect: (element: HistoricalElement) => void;
  selectedElement: HistoricalElement | null;
}

export function DiscoveryPath({
  elements,
  onElementSelect,
  selectedElement,
}: DiscoveryPathProps) {
  return (
    <div className="relative">
      {/* Path Line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-900/20" />

      {/* Scrollable Elements */}
      <ScrollArea className="pb-8" orientation="horizontal">
        <div className="flex gap-6 px-4 min-w-max">
          {elements.map((element, index) => (
            <Card
              key={element.id}
              className={`w-[300px] transition-all duration-300 border-amber-900/20
                ${element.unlocked ? "bg-stone-900/50" : "bg-stone-900/30"}
                ${
                  selectedElement?.id === element.id
                    ? "ring-2 ring-amber-500/50"
                    : ""
                }`}
              onClick={() => onElementSelect(element)}
            >
              <div className="relative aspect-square">
                <img
                  src={
                    element.unlocked
                      ? element.modelData.targetImagePath
                      : element.clues.silhouette // Changed from modelData.silhouette
                  }
                  alt={element.name}
                  className={`w-full h-full object-cover ${
                    !element.unlocked ? "opacity-50" : ""
                  }`}
                />
                {!element.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-amber-500/50" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-serif text-amber-100">
                      {element.name}
                    </h3>
                    <p className="text-sm text-amber-200/60 mt-1">
                      {element.unlocked
                        ? element.location.area
                        : "Location unknown"}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-amber-500">
                    {element.id}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
