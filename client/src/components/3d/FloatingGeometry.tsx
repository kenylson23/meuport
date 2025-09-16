import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGeometryProps {
  currentSection: string;
}

const FloatingGeometry = ({ currentSection }: FloatingGeometryProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Pre-calculate positions and rotations
  const geometries = useMemo(() => {
    const shapes = [];
    for (let i = 0; i < 20; i++) {
      shapes.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: 0.5 + Math.random() * 1.5,
        type: Math.floor(Math.random() * 3), // 0: box, 1: sphere, 2: octahedron
        speed: 0.5 + Math.random() * 1
      });
    }
    return shapes;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      
      // Animate individual geometries
      groupRef.current.children.forEach((child, index) => {
        const geometry = geometries[index];
        child.rotation.x += 0.01 * geometry.speed;
        child.rotation.y += 0.02 * geometry.speed;
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {geometries.map((geo, index) => {
        const GeometryComponent = () => {
          switch (geo.type) {
            case 0:
              return <boxGeometry args={[1, 1, 1]} />;
            case 1:
              return <sphereGeometry args={[0.8, 16, 16]} />;
            default:
              return <octahedronGeometry args={[0.8]} />;
          }
        };

        return (
          <mesh
            key={index}
            position={geo.position as [number, number, number]}
            rotation={geo.rotation as [number, number, number]}
            scale={geo.scale}
          >
            <GeometryComponent />
            <meshStandardMaterial
              color="#00ff00"
              transparent
              opacity={0.1}
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default FloatingGeometry;
