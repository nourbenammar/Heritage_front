"use client";

import { Card } from "@/components/ui/card";

interface VirtualMuseumProps {
  character: {
    avatarUrl: string;
    name: string;
  };
}

export function VirtualMuseum({ character }: VirtualMuseumProps) {
  return (
    <div className="container mx-auto p-4">
      {/* Character Info */}
      <Card className="p-4 bg-stone-900/50 border-amber-900/20">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={character.avatarUrl}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-serif text-amber-100">
              {character.name}
            </h2>
            <p className="text-sm text-amber-200/60">Virtual Museum Explorer</p>
          </div>
        </div>
      </Card>

      {/* Museum Space - Placeholder for now */}
      <div
        className="mt-8 aspect-video bg-stone-900/30 rounded-lg border border-amber-900/20
                    flex items-center justify-center"
      >
        <p className="text-amber-200/60">Virtual Museum Space</p>
      </div>
    </div>
  );
}
