"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, X, Scan, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedElement: any;
  onUnlockElement: () => void; // New prop to handle unlocking
}

export function CameraModal({
  open,
  onOpenChange,
  selectedElement,
  onUnlockElement,
}: CameraModalProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<"success" | "failure" | null>(
    null
  );

  useEffect(() => {
    if (open) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        .then((stream) => {
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setScanResult(null);
      }
    }
  }, [open]);

  const handleCapture = () => {
    setIsScanning(true);

    // Simulate scanning process
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "success" : "failure";
      setScanResult(result);
      setIsScanning(false);

      if (result === "success") {
        // Close modal after 2 seconds and unlock the element
        setTimeout(() => {
          onOpenChange(false);
          onUnlockElement(); // Unlock the element
        }, 2000);
      } else {
        // Clear the scan result after 2 seconds
        setTimeout(() => {
          setScanResult(null);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 bg-stone-950 border-amber-900/20">
        <DialogHeader className="sr-only">
          <DialogTitle>Scanner d'artefacts</DialogTitle>
        </DialogHeader>

        <div className="relative">
          {/* Camera View */}
          <div className="relative aspect-square bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {scanResult ? (
                // Result Overlay
                <div className="flex flex-col items-center justify-center gap-4 bg-stone-950/80 w-full h-full">
                  {scanResult === "success" ? (
                    <>
                      <CheckCircle2 className="w-16 h-16 text-green-500 animate-in zoom-in" />
                      <p className="text-green-400 text-lg">Match Found!</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-16 h-16 text-red-500 animate-in zoom-in" />
                      <p className="text-red-400 text-lg">Try Again</p>
                    </>
                  )}
                </div>
              ) : (
                // Target Guide Overlay
                <div className="w-4/5 aspect-square relative">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500" />

                  {/* Target Silhouette */}
                  {selectedElement && (
                    <img
                      src={selectedElement.clues.silhouette}
                      alt="Target outline"
                      className="absolute inset-0 w-full h-full object-contain opacity-40"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Camera Controls */}
          <div className="absolute bottom-0 inset-x-0 pb-6 px-6">
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <button
                onClick={() => onOpenChange(false)}
                className="p-3 rounded-full bg-stone-900/80 text-amber-100 hover:bg-stone-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={handleCapture}
                disabled={isScanning || !!scanResult}
                className={cn(
                  "p-6 rounded-full transition-all",
                  isScanning || scanResult
                    ? "bg-stone-700 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-400"
                )}
              >
                {isScanning ? (
                  <Scan className="w-8 h-8 text-amber-100 animate-spin" />
                ) : (
                  <Camera className="w-8 h-8 text-stone-900" />
                )}
              </button>
              <div className="w-12" /> {/* Spacer for alignment */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}