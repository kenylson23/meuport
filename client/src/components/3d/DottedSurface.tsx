import * as THREE from 'three';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [hasError, setHasError] = useState(false);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		points: THREE.Points;
		animationId: number;
		count: number;
	} | null>(null);

	// Reduzindo a densidade para performance
	const SEPARATION = 180;
	const AMOUNTX = 30; 
	const AMOUNTY = 40;

	useEffect(() => {
		if (!containerRef.current) return;

		let renderer: THREE.WebGLRenderer;
		try {
			// Scene setup
			const scene = new THREE.Scene();
			scene.fog = new THREE.Fog(0x000000, 2000, 10000);

			const camera = new THREE.PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				1,
				10000,
			);
			camera.position.set(0, 355, 1220);

			renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: false, // Desabilitado para performance
				powerPreference: 'high-performance',
				failIfMajorPerformanceCaveat: true
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limitando pixel ratio
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setClearColor(0x000000, 0);

			containerRef.current.appendChild(renderer.domElement);

			// Create geometry
			const numParticles = AMOUNTX * AMOUNTY;
			const positions = new Float32Array(numParticles * 3);
			const colors = new Float32Array(numParticles * 3);
			const geometry = new THREE.BufferGeometry();

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
					const y = 0;
					const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

					positions[i * 3] = x;
					positions[i * 3 + 1] = y;
					positions[i * 3 + 2] = z;

					colors[i * 3] = 0;
					colors[i * 3 + 1] = 1;
					colors[i * 3 + 2] = 0;
					i++;
				}
			}

			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

			const material = new THREE.PointsMaterial({
				size: 10,
				vertexColors: true,
				transparent: true,
				opacity: 0.7,
				sizeAttenuation: true,
			});

			const points = new THREE.Points(geometry, material);
			scene.add(points);

			let count = 0;
			let animationId: number = 0;
			let lastTime = 0;

			const animate = (time: number) => {
				animationId = requestAnimationFrame(animate);
				
				// Throttle para 60fps
				if (time - lastTime < 16) return;
				lastTime = time;

				const positionAttribute = geometry.attributes.position;
				const positionsArray = positionAttribute.array as Float32Array;

				let i = 0;
				for (let ix = 0; ix < AMOUNTX; ix++) {
					for (let iy = 0; iy < AMOUNTY; iy++) {
						const index = i * 3;
						// Simplificando o cálculo da onda
						positionsArray[index + 1] =
							Math.sin((ix + count) * 0.3) * 40 +
							Math.sin((iy + count) * 0.5) * 40;
						i++;
					}
				}

				positionAttribute.needsUpdate = true;
				renderer.render(scene, camera);
				count += 0.08; // Movimento mais lento e suave
			};

			const handleResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			window.addEventListener('resize', handleResize);
			animationId = requestAnimationFrame(animate);

			sceneRef.current = {
				scene,
				camera,
				renderer,
				points,
				animationId,
				count,
			};

			return () => {
				window.removeEventListener('resize', handleResize);
				if (sceneRef.current) {
					cancelAnimationFrame(sceneRef.current.animationId);
					sceneRef.current.points.geometry.dispose();
					if (Array.isArray(sceneRef.current.points.material)) {
						sceneRef.current.points.material.forEach((m) => m.dispose());
					} else {
						sceneRef.current.points.material.dispose();
					}
					sceneRef.current.renderer.dispose();
					if (containerRef.current && sceneRef.current.renderer.domElement) {
						containerRef.current.removeChild(sceneRef.current.renderer.domElement);
					}
				}
			};
		} catch (e) {
			console.error("WebGL error:", e);
			setHasError(true);
		}
	}, []);

	if (hasError) return null;

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 z-0', className)}
			{...props}
		/>
	);
}
