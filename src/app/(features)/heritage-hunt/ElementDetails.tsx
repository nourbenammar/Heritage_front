"use client";

import { Card } from "@/components/ui/card";
import { Camera, Map, History, Info, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ElementDetailsProps {
  element: HistoricalElement;
  onScan: () => void;
}

export function ElementDetails({ element, onScan }: ElementDetailsProps) {
  if (!element) {
    return <div>Chargement...
    </div>;
  }

  const beforeImagePath =
    element.modelData.targetImagePath?.replace("after.jpg", "before.jpg") ||
    "/fig_296/before.jpg";

  const displayImagePath = element.unlocked
    ? element.modelData.targetImagePath
    : beforeImagePath;

  return (
    <div className="grid md:grid-cols-[1.5fr,1fr] gap-8">
      {/* Left Image Section */}
      <div className="space-y-6">
        <Card className="overflow-hidden bg-stone-900/50 border-amber-900/20">
          <div className="aspect-video relative">
            <img
              src={displayImagePath}
              alt={element.name}
              className={cn(
                "w-full h-full object-contain transition-all duration-500", // changed from object-cover to object-contain
                element.unlocked
                  ? "brightness-100 contrast-100 saturate-100"
                  : "brightness-50 contrast-75 saturate-50 grayscale"
              )}
            />

            {!element.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
            )}
          </div>
        </Card>
        {!element.unlocked && (
          <button
            onClick={onScan}
            className="w-full p-4 bg-amber-900/20 rounded-lg border border-amber-900/20
              hover:bg-amber-900/40 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-6 h-6 text-amber-500" />
            <span className="text-amber-100">Scan to Discover</span>
          </button>
        )}
      </div>

      {/* Right Details Section */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-serif text-amber-100">
              {element.name}
            </h2>
            <span className="text-sm font-mono text-amber-500">
              {element.id}
            </span>
          </div>
        </div>

        {element.unlocked ? (
          <>
            <p className="text-amber-200/80">{element.details.description}</p>
            <div className="space-y-2">
              <h3 className="text-lg font-serif text-amber-100">
              Contexte historique
              </h3>
              <p className="text-amber-200/60">
                {element.modelData.historicalContext}
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-stone-900/50 border border-amber-900/20">
              <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200/60 italic">
                "{element.modelData.riddle}"
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-amber-100">
              Rechercher des indices
              </h3>
              <ul className="space-y-2">
                {element.location.hints.map((hint, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-amber-200/60"
                  >
                    <span className="text-amber-500">•</span>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4">
          <div className="flex items-center gap-2 text-sm text-amber-200/60">
            <Map className="w-4 h-4 text-amber-500" />
            {element.location.area}
          </div>
          {element.unlocked && (
            <div className="flex items-center gap-2 text-sm text-amber-200/60">
              <History className="w-4 h-4 text-amber-500" />
              Découvert
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
