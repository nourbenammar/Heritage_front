export type ElementCategory =
  | "Roman"
  | "Byzantine"
  | "Christian"
  | "Industrial";
export type ElementType =
  | "artifact"
  | "building"
  | "inscription"
  | "architectural";
export type ElementDifficulty = 1 | 2 | 3;
export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface HistoricalElement {
  id: string;
  name: string;
  type: ElementType;
  difficulty: ElementDifficulty;
  category: ElementCategory;
  points: number;
  location: {
    area: string;
    coordinates?: string;
    hints: string[];
  };
  clues: {
    silhouette: string;
    riddle: string;
    historicalContext: string;
  };
  details: {
    description: string;
    historicalPeriod: string;
    significance: string;
    funFacts: string[];
    relatedElements: string[];
  };
  unlockRequirements?: {
    prerequisiteElements: string[];
    timeOfDay?: TimeOfDay;
    specialConditions?: string[];
  };
  rewards: {
    points: number;
    badge?: string;
    title?: string;
    specialUnlock?: string;
  };
  modelData: {
    targetImagePath: string;
    recognitionThreshold: number;
    alternativeAngles: string[];
  };
}

export interface PlayerProgress {
  points: number;
  unlockedElements: string[];
  currentQuests: string[];
  achievements: string[];
  lastLocation?: {
    latitude: number;
    longitude: number;
  };
}