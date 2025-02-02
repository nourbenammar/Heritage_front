import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Camera, User, Loader2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CharacterCreationModalProps {
  open: boolean;
  onComplete: (character: { avatarUrl: string; name: string }) => void;
}

export function CharacterCreationModal({
  open,
  onComplete,
}: CharacterCreationModalProps) {
  const [step, setStep] = useState<
    "intro" | "capture" | "processing" | "naming"
  >("intro");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initializeCamera = async () => {
      if (step === "capture") {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (error) {
          console.error("Camera error:", error);
          alert("Camera access is required for avatar creation");
          setStep("intro");
        }
      }
    };

    initializeCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [step]);

  const uploadImage = async (imageBlob: Blob): Promise<string> => {
    try {
      // Validate the captured image
      if (!imageBlob || imageBlob.size === 0) {
        throw new Error("Captured image is empty");
      }

      // Create proper File object with explicit MIME type
      const file = new File([imageBlob], "image.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("image", file, "image.jpg");

      // Debug FormData contents
      console.log("FormData entries:", Array.from(formData.entries()));

      const response = await fetch("/api/artguru?path=upload", {
        method: "POST",
        body: formData,
      });

      // Handle API response
      const data = await response.json();
      console.log("Upload response:", data);

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "Image upload failed");
      }

      return data.data.imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  const generateAvatar = async (imageUrl: string): Promise<string> => {
    try {
      const response = await fetch("/api/artguru?path=generate-or-queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          style: "default",
          aspectRatio: "square",
          caseId: null,
          caseType: "USER",
          height: 360,
          image: imageUrl,
          negativePrompt: "",
          prompt: "Game Avatar",
          width: 540,
        }),
      });

      const data = await response.json();
      console.log("Generation response:", data);

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "Generation request failed");
      }

      if (!data.data?.asyncTaskQueueVO?.asyncTaskId) {
        throw new Error("Invalid API response format");
      }

      return await pollGenerationStatus(data.data.asyncTaskQueueVO.asyncTaskId);
    } catch (error) {
      console.error("Generation error:", error);
      throw new Error(`Generation failed: ${error.message}`);
    }
  };

  const pollGenerationStatus = async (taskId: string): Promise<string> => {
    let attempts = 0;
    const maxAttempts = 30;
    const pollInterval = 2000;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        const response = await fetch("/api/artguru?path=get-queue-task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            asyncTaskIds: [taskId],
          }),
        });

        const data = await response.json();
        console.log(`Poll attempt ${attempts}:`, data);

        if (!response.ok || data.code !== 0) {
          throw new Error(data.message || "Status check failed");
        }

        const status = data.data?.[0];
        if (!status) {
          throw new Error("Invalid status response format");
        }

        switch (status.queueStatus) {
          case "SUCCESS":
            return status.generateImage;
          case "FAILED":
            throw new Error(status.message || "Generation failed");
          default:
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }
      } catch (error) {
        console.error("Polling error:", error);
        throw error;
      }
    }

    throw new Error("Generation timed out after 60 seconds");
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        throw new Error("Camera feed not initialized");
      }

      // Create canvas with video dimensions
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to JPEG with quality 0.8
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size === 0) {
              reject("Failed to capture image");
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.8
        );
      });

      setStep("processing");
      const uploadedUrl = await uploadImage(blob);
      const avatarUrl = await generateAvatar(uploadedUrl);

      setGeneratedAvatar(avatarUrl);
      setStep("naming");
    } catch (error) {
      console.error("Capture error:", error);
      alert(`Error: ${error.message}`);
      setStep("capture");
    }
  };

  const handleComplete = () => {
    if (generatedAvatar && name) {
      onComplete({ avatarUrl: generatedAvatar, name });
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-xl bg-stone-950 border-amber-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-amber-100">
            Create Your Character
          </DialogTitle>
          <DialogDescription className="text-amber-200/60">
            Let's create your virtual museum avatar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === "intro" && (
            <div className="text-center space-y-6 py-8">
              <User className="w-16 h-16 text-amber-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-serif text-amber-100">
                  Welcome to Virtual Museum
                </h3>
                <p className="text-sm text-amber-200/60">
                  Take a photo to create your AI-powered avatar
                </p>
              </div>
              <button
                onClick={() => setStep("capture")}
                className="px-6 py-3 bg-amber-900/20 hover:bg-amber-900/40 text-amber-100 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          )}

          {step === "capture" && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-amber-500/50 rounded-full" />
                </div>
              </div>
              <button
                onClick={handleCapture}
                className="w-full py-3 bg-amber-900/20 hover:bg-amber-900/40 text-amber-100 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </button>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center space-y-4 py-8">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
              <p className="text-amber-200/60">
                Creating your AI-powered avatar...
              </p>
            </div>
          )}

          {step === "naming" && generatedAvatar && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Card className="w-32 h-32 shrink-0 bg-stone-900/50 border-amber-900/20 overflow-hidden">
                  <img
                    src={generatedAvatar}
                    alt="Generated Avatar"
                    className="w-full h-full object-cover"
                  />
                </Card>
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <label className="text-sm text-amber-200/60">
                      Enter Your Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-stone-900/50 border-amber-900/20 text-amber-100"
                      placeholder="Your character name"
                    />
                  </div>
                  <button
                    onClick={handleComplete}
                    disabled={!name}
                    className="w-full py-2 bg-amber-900/20 hover:bg-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed text-amber-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Complete Creation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
