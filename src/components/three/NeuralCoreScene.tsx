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

// 1. Central Pulsating Quantum Core
function QuantumCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2.2) * 0.08;

    if (coreRef.current) {
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = t * 0.15;
    }
    if (glowRef.current) {
      const glowPulse = 1 + Math.sin(t * 2.2 + 0.5) * 0.12;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }
  });

  return (
    <group>
      {/* Inner Dense Energy Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#ffd426"
          emissive="#ff9f1c"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Outer Soft Energy Corona */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.72, 24, 24]} />
        <meshBasicMaterial
          color="#ffd426"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// 2. Outer Neural Lattice & Interconnected Node Points
function NeuralLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Create outer Icosahedron geometry for neural nodes & synaptic lines
  // Compact radius 1.6 ensures 100% full visibility without clipping at any rotation angle
  const { linesGeom, nodePositions } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.6, 1);
    const wire = new THREE.WireframeGeometry(ico);

    // Extract unique vertex positions for node spheres
    const posAttr = ico.attributes.position;
    const uniqueMap = new Map<string, THREE.Vector3>();

    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3(
        posAttr.getX(i),
        posAttr.getY(i),
        posAttr.getZ(i)
      );
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, v);
      }
    }

    return {
      linesGeom: wire,
      nodePositions: Array.from(uniqueMap.values()),
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Slow majestic rotation
    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.x += delta * 0.12;

    // Gentle lerped tilt following mouse pointer
    const targetTiltX = pointer.y * 0.35;
    const targetTiltY = pointer.x * 0.45;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetTiltY * 0.22,
      0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -targetTiltX * 0.22,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Central Pulsating Core */}
      <QuantumCore />

      {/* Synaptic Wireframe Lines */}
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial
          color="#ffd426"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Glowing Neural Node Points */}
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.042, 12, 12]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? "#ffd426" : "#ff9f1c"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Thin Orbital Telemetry Rings */}
      <OrbitalRings />
    </group>
  );
}

// 3. Orbital Telemetry Rings (scaled so they never clip the canvas borders)
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.28;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Ring 1 - Inclined 45 deg */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.15, 0.012, 16, 100]} />
        <meshBasicMaterial
          color="#ffd426"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 2 - Opposing angle */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, -Math.PI / 5, 0]}>
        <torusGeometry args={[2.35, 0.011, 16, 100]} />
        <meshBasicMaterial
          color="#ff9f1c"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// 4. Starlight / Dust Particles (loved by the user)
function DustParticles({ count = 320 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const amberColor = new THREE.Color("#ffd426");
    const emberColor = new THREE.Color("#ff9f1c");
    const whiteStar = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);

      pos[i * 3] = (r1 - 0.5) * 8.0;
      pos[i * 3 + 1] = (r2 - 0.5) * 6.0;
      pos[i * 3 + 2] = (r3 - 0.5) * 5.0;

      let c = amberColor;
      if (r1 > 0.65) c = whiteStar;
      else if (r1 > 0.35) c = emberColor;

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
        size={0.034}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export interface NeuralCoreSceneProps {
  isInView?: boolean;
}

export default function NeuralCoreScene({
  isInView = true,
}: NeuralCoreSceneProps) {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] xl:h-[480px] max-h-[56vh]">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={isInView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Warm Ambient & Focus Lighting */}
        <ambientLight color="#ffd426" intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#ffffff" intensity={2.8} />
        <pointLight position={[-5, -4, -4]} color="#ff9f1c" intensity={2.2} />
        <pointLight position={[0, -4, 4]} color="#ffd426" intensity={1.8} />

        {/* Subtle environment reflections */}
        <Environment preset="city" environmentIntensity={0.25} />

        {/* 3D Neural Architecture Core (100% boundary-safe, zero clipping) */}
        <NeuralLattice />

        {/* Starlight Drifting Dust Particles */}
        <DustParticles count={320} />
      </Canvas>
    </div>
  );
}
