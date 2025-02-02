// src/lib/data/heritage-elements.ts
import { HistoricalElement } from "../types/heritage-hunt";

export const heritageElements: HistoricalElement[] = [
  {
    id: "CAP-001",
    name: "Corinthian Capital",
    type: "architectural",
    difficulty: 2,
    category: "Roman",
    points: 150,
    location: {
      area: "Temple Complex",
      coordinates: "35.2321° N, 9.1239° E",
      hints: [
        "Look for fallen columns near the main temple",
        "Eastern side of the forum",
        "Near the Byzantine fortress",
      ],
    },
    clues: {
      silhouette: "/fig_296/before.jpg",
      riddle:
        "Atop columns I did stand, with leaves of stone in patterns grand",
      historicalContext:
        "Part of the main temple's colonnade, showing typical 2nd century Roman craftsmanship",
    },
    details: {
      description:
        "An ornate Corinthian capital featuring acanthus leaves and detailed volutes",
      historicalPeriod: "2nd Century AD",
      significance:
        "Demonstrates the high level of architectural sophistication in Roman Sufetula",
      funFacts: [
        "Carved from local limestone",
        "Shows signs of earthquake damage",
        "Similar to capitals found in Carthage",
      ],
      relatedElements: ["COL-001", "BAS-002"],
    },
    rewards: {
      points: 150,
      badge: "Master of Architecture",
      title: "Temple Explorer",
    },
    modelData: {
      targetImagePath: "/fig_296/after.jpg", // Path for the colored image
      recognitionThreshold: 0.85,
      alternativeAngles: ["/fig_296/after-alt1.jpg", "/fig_296/after-alt2.jpg"],
    },
    unlocked: false, // Ensure this property is present
  },
  // Add more elements...
];
