"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Loader2, Wand2 } from "lucide-react";

const generationSteps = [
  "Analyzing historical data...",
  "Processing architectural details...",
  "Calculating measurements...",
  "Generating base model...",
  "Applying textures...",
  "Optimizing resolution...",
  "Finalizing reconstruction...",
];

interface GLBViewerProps {
  modelPath: string;
}

export default function GLBViewer({ modelPath }: GLBViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentGenerationStep, setCurrentGenerationStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Extract title from GLB path (e.g., "/models/Figure 335.glb" -> "Figure 335")
  const modelTitle = modelPath.split("/").pop()?.replace(".glb", "") || "";

  useEffect(() => {
    // Simulate generation steps
    let step = 0;
    const generationInterval = setInterval(() => {
      if (step < generationSteps.length) {
        setGenerationProgress((step + 1) * (100 / generationSteps.length));
        setCurrentGenerationStep(step);
        step++;
      } else {
        clearInterval(generationInterval);
        setIsGenerating(false);
        initScene();
      }
    }, 1000);

    return () => clearInterval(generationInterval);
  }, []);

  const initScene = () => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1a1a1a");

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        scene.add(gltf.scene);

        // Center and scale model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        gltf.scene.scale.setScalar(scale);

        gltf.scene.position.sub(center.multiplyScalar(scale));
        setIsLoading(false);
      },
      (progress) => {
        if (progress.total > 0) {
          const progressPercentage = (progress.loaded / progress.total) * 100;
          setLoadingProgress(Math.min(progressPercentage, 100));
        } else {
          setLoadingProgress(0);
        }
      },
      (error) => {
        console.error("Error loading GLB:", error);
      }
    );

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      if (!containerRef.current) return;

      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  };

  return (
    <div
      ref={containerRef}
      className="aspect-square bg-stone-900/50 rounded-lg border border-amber-900/20 overflow-hidden"
    >
      {isGenerating && (
        <div className="h-full flex flex-col items-center justify-center bg-stone-900/90 p-8">
          <Wand2 className="w-12 h-12 text-amber-500 animate-pulse mb-6" />
          <div className="text-center space-y-4 max-w-md">
            <h3 className="text-xl font-serif text-amber-100">{modelTitle}</h3>
            <p className="text-amber-200/60">
              {generationSteps[currentGenerationStep]}
            </p>
            <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all duration-300"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <div className="text-sm text-amber-200/60">
              {generationProgress.toFixed(0)}% Complete
            </div>
          </div>
        </div>
      )}

      {!isGenerating && isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/90">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-4" />
          <div className="text-center">
            <div className="text-amber-100 mb-2">Loading Model...</div>
          </div>
        </div>
      )}
    </div>
  );
}
