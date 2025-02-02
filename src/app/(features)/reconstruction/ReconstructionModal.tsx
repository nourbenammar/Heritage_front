"use client";

import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dynamic import with noSSR for 3D Viewer
const GLBViewer = dynamic(() => import("./GLBViewer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square bg-stone-900/50 rounded-lg border border-amber-900/20 overflow-hidden flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    </div>
  ),
});

interface ReconstructionModalProps {
  artifact: {
    id: string;
    titre: string;
    figure: string;
    description: string;
    details: {
      dimensions: string;
      materiaux_de_construction: string;
    };
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReconstructionModal({
  artifact,
  open,
  onOpenChange,
}: ReconstructionModalProps) {
  if (!artifact) return null;

  console.log(artifact.details);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[90vw] max-w-4xl bg-stone-950 border-amber-900/20">
        <ScrollArea className="max-h-[calc(90vh-2rem)]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-amber-100">
              3D Reconstruction
            </DialogTitle>
            <DialogDescription className="text-amber-200/60">
              {artifact.titre}
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-8">
            {/* 3D Viewer */}
            <div className="relative">
              <GLBViewer modelPath={`/models/${artifact.figure}.glb`} />
            </div>
            {/* Artifact Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4 bg-stone-900/50 border-amber-900/20">
              <h3 className="font-serif text-amber-100 mb-4">
                Dimensions
              </h3>
              <div className="space-y-2 text-sm text-amber-200/60">
                {/* Check if artifact.details exists, and if dimensions is valid */}
                <span>{artifact.dimensions || "pas d'informations pour le moment"}</span>
              </div>
            </Card>


            <Card className="p-4 bg-stone-900/50 border-amber-900/20">
              <h3 className="font-serif text-amber-100 mb-4">
                Materiaux de construction
              </h3>
              <div className="space-y-2 text-sm text-amber-200/60">
                {/* Check if artifact.details exists, otherwise provide a fallback */}
                <span>{artifact.materials || "pas d'informations pour le moment"}</span>
              </div>
            </Card>


            </div>

            {/* Description */}
            <Card className="p-4 bg-stone-900/50 border-amber-900/20">
              <h3 className="font-serif text-amber-100 mb-2">
                Contexte historique
              </h3>
              <p className="text-sm text-amber-200/60">
                {artifact.description}
              </p>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
