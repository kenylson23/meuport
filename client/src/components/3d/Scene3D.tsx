import { Suspense } from "react";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  currentSection: string;
}

const Scene3D = ({ currentSection }: Scene3DProps) => {
  try {
    return (
      <Suspense fallback={null}>
        {/* Simple lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00ff00" />
        
        {/* Simplified background stars */}
        <Stars
          radius={100}
          depth={30}
          count={500}
          factor={4}
          saturation={0}
          fade={true}
        />
        
        {/* Simple rotating box as 3D element */}
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#00ff00" 
            transparent 
            opacity={0.1} 
            wireframe 
          />
        </mesh>
      </Suspense>
    );
  } catch (error) {
    console.error('Scene3D error:', error);
    return null;
  }
};

export default Scene3D;
