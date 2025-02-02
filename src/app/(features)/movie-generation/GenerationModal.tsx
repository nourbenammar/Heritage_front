"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  Wand2,
  CheckCircle,
  Settings,
  Film,
  Brush,
  Cpu,
  Layers,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenerationModalProps {
  site: {
    id: string;
    name: string;
    description: string;
    videoPath: string; // Add videoPath to site object
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GenerationModal({
  site,
  open,
  onOpenChange,
}: GenerationModalProps) {
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const steps = [
    "Analyzing historical data...",
    "Generating architectural elements...",
    "Creating environment...",
    "Composing scenes...",
    "Rendering final sequence...",
  ];

  const icons = [Wand2, Brush, Cpu, Layers, Film];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open && generationStep < steps.length) {
      timer = setTimeout(() => {
        setGenerationStep((prev) => prev + 1);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [open, generationStep, steps.length]);

  useEffect(() => {
    let timeCounter: NodeJS.Timeout;
    if (open && generationStep < steps.length) {
      timeCounter = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timeCounter);
  }, [open, generationStep, steps.length]);

  useEffect(() => {
    if (!open) {
      setGenerationStep(0);
      setElapsedTime(0);
    }
    if (generationStep === steps.length) {
      setElapsedTime((prev) => prev + 1);
    }
  }, [open, generationStep]);

  if (!site) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-stone-950 border-amber-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-amber-100">
            Generating Historical Movie
          </DialogTitle>
          <DialogDescription className="text-amber-200/60">
            Site: {site.name} (ID: {site.id})
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="p-6 space-y-8">
            {/* Progress Cards */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = icons[index];
                return (
                  <Card
                    key={index}
                    className={`p-4 border-amber-900/20 transition-all duration-500 ${
                      index === generationStep
                        ? "bg-amber-900/20"
                        : index < generationStep
                        ? "bg-stone-900/50 opacity-50"
                        : "bg-stone-900/20 hidden"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {index < generationStep ? (
                        <div className="w-8 h-8 rounded-full bg-amber-900/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-amber-500" />
                        </div>
                      ) : index === generationStep ? (
                        <div className="w-8 h-8 rounded-full bg-amber-900/20 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-stone-700" />
                        </div>
                      )}
                      <span
                        className={`text-lg ${
                          index === generationStep
                            ? "text-amber-100"
                            : "text-amber-200/60"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Preview Area */}
            {generationStep === steps.length && (
              <div className="aspect-video rounded-lg bg-stone-900/50 border border-amber-900/20 flex items-center justify-center">
                {site.videoPath ? (
                  <video
                    src={site.videoPath}
                    controls
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-amber-200/40">
                    No video available for this site.
                  </span>
                )}
              </div>
            )}

            {/* Generation Details */}
            <div className="space-y-2">
              <h3 className="font-serif text-amber-100">Generation Details</h3>
              <div className="text-sm text-amber-200/60 space-y-1">
                <p>Model: Historical Site Reconstruction v1.0</p>
                <p>Style: Archaeological Visualization</p>
                <p>Resolution: 1920x1080</p>
                <p>Duration: {elapsedTime} seconds</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
