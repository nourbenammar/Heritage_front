"use client";

export function PapyrusEdge() {
  return (
    <svg
      className="absolute left-0 top-0 w-full h-8 text-amber-900/20"
      viewBox="0 0 400 32"
    >
      <path d="M0,8 Q100,0 200,8 T400,8 V0 H0" fill="currentColor" />
    </svg>
  );
}

export function StoneCarving() {
  return (
    <svg
      className="absolute right-0 top-0 w-32 h-32 text-amber-900/10"
      viewBox="0 0 100 100"
    >
      <path
        d="M10,10 Q30,5 50,10 T90,10"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
      />
      {/* Add more decorative patterns */}
    </svg>
  );
}
