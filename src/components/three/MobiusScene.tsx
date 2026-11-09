"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// Deterministic pseudo-random helper for pure idempotent rendering
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9999.123) * 10000;
  return x - Math.floor(x);
}

function createMobiusGeometry(
  radius = 2.1,
  width = 0.55,
  uSegments = 160,
  vSegments = 24
) {
  const geom = new THREE.BufferGeometry();
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const colorA = new THREE.Color("#ffd426"); // Accent Amber Gold
  const colorB = new THREE.Color("#b45309"); // Copper
  const colorMid = new THREE.Color("#ff9f1c"); // Ember

  for (let i = 0; i <= uSegments; i++) {
    const u = (i / uSegments) * Math.PI * 2;
    // Cyclic gradient along the ribbon loop
    const tGradient = (Math.sin(u) + 1) / 2;
    const vertexColor = new THREE.Color();
    if (tGradient < 0.5) {
      vertexColor.lerpColors(colorA, colorMid, tGradient * 2);
    } else {
      vertexColor.lerpColors(colorMid, colorB, (tGradient - 0.5) * 2);
    }

    for (let j = 0; j <= vSegments; j++) {
      const v = (j / vSegments - 0.5) * width;

      // Möbius strip parametrization
      const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      positions.push(x, y, z);
      colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
    }
  }

  const rowSize = vSegments + 1;
  for (let i = 0; i < uSegments; i++) {
    for (let j = 0; j < vSegments; j++) {
      const a = i * rowSize + j;
      const b = (i + 1) * rowSize + j;
      const c = (i + 1) * rowSize + (j + 1);
      const d = i * rowSize + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

function RibbonMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => createMobiusGeometry(2.1, 0.55, 160, 24), []);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.32;

    // Gentle tilt that follows the mouse (lerped)
    const targetTiltX = pointer.y * 0.35;
    const targetTiltY = pointer.x * 0.45;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetTiltY * 0.3,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      -targetTiltX * 0.3,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} geometry={geom}>
      <meshPhysicalMaterial
        vertexColors
        metalness={0.95}
        roughness={0.25}
        clearcoat={0.85}
        clearcoatRoughness={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function DustParticles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const amberColor = new THREE.Color("#ffd426");
    const emberColor = new THREE.Color("#ff9f1c");

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);

      pos[i * 3] = (r1 - 0.5) * 8;
      pos[i * 3 + 1] = (r2 - 0.5) * 6;
      pos[i * 3 + 2] = (r3 - 0.5) * 5;

      const c = r1 > 0.45 ? amberColor : emberColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
      pointsRef.current.rotation.x += delta * 0.018;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export interface MobiusSceneProps {
  isInView?: boolean;
}

export default function MobiusScene({ isInView = true }: MobiusSceneProps) {
  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px]">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={isInView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Warm Ambient & Directional Lighting */}
        <ambientLight color="#ffd426" intensity={0.35} />
        <pointLight position={[6, 6, 6]} color="#ffffff" intensity={2.5} />
        <pointLight position={[-6, -4, -4]} color="#ff9f1c" intensity={2.0} />
        <pointLight position={[0, -5, 5]} color="#ffd426" intensity={1.5} />

        {/* Drei low-intensity environment reflection */}
        <Environment preset="city" environmentIntensity={0.25} />

        {/* Floating Mobius Strip Ribbon */}
        <RibbonMesh />

        {/* 300 Tiny Drifting Dust Particles */}
        <DustParticles count={300} />
      </Canvas>
    </div>
  );
}
