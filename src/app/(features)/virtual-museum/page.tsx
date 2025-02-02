"use client";

import { useState } from "react";
import { CharacterCreationModal } from "./CharacterCreationModal";
import { VirtualMuseum } from "./VirtualMuseum";

export default function VirtualMuseumPage() {
  const [character, setCharacter] = useState<{
    avatarUrl: string;
    name: string;
  } | null>(null);
  const [showCreation, setShowCreation] = useState(true);

  return (
    <div className="min-h-screen">
      {!character ? (
        <CharacterCreationModal
          open={showCreation}
          onComplete={(newCharacter) => {
            setCharacter(newCharacter);
            setShowCreation(false);
          }}
        />
      ) : (
        <VirtualMuseum character={character} />
      )}
    </div>
  );
}
