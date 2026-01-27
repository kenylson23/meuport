import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
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
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		let renderer: THREE.WebGLRenderer;
		try {
			const SEPARATION = 150;
			const AMOUNTX = 40;
			const AMOUNTY = 60;

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
				antialias: true,
				failIfMajorPerformanceCaveat: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setClearColor(0x000000, 0);

			containerRef.current.appendChild(renderer.domElement);

			// Create geometry
			const positions: number[] = [];
			const colors: number[] = [];
			const geometry = new THREE.BufferGeometry();

			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
					const y = 0;
					const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

					positions.push(x, y, z);
					// Usando um verde neon mais brilhante e saturado
					colors.push(0, 1, 0); // Verde puro brilhante
				}
			}

			geometry.setAttribute(
				'position',
				new THREE.Float32BufferAttribute(positions, 3),
			);
			geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

			const material = new THREE.PointsMaterial({
				size: 12, // Aumentado significativamente para visibilidade extrema
				vertexColors: true,
				transparent: true,
				opacity: 0.9,
				sizeAttenuation: true,
			});

			const points = new THREE.Points(geometry, material);
			scene.add(points);

			let count = 0;
			let animationId: number = 0;

			const animate = () => {
				animationId = requestAnimationFrame(animate);

				const positionAttribute = geometry.attributes.position;
				const positionsArray = positionAttribute.array as Float32Array;

				let i = 0;
				for (let ix = 0; ix < AMOUNTX; ix++) {
					for (let iy = 0; iy < AMOUNTY; iy++) {
						const index = i * 3;
						positionsArray[index + 1] =
							Math.sin((ix + count) * 0.3) * 50 +
							Math.sin((iy + count) * 0.5) * 50;
						i++;
					}
				}

				positionAttribute.needsUpdate = true;
				renderer.render(scene, camera);
				count += 0.1;
			};

			const handleResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			window.addEventListener('resize', handleResize);
			animate();

			sceneRef.current = {
				scene,
				camera,
				renderer,
				particles: [points],
				animationId,
				count,
			};

			return () => {
				window.removeEventListener('resize', handleResize);
				if (sceneRef.current) {
					cancelAnimationFrame(sceneRef.current.animationId);
					sceneRef.current.scene.traverse((object) => {
						if (object instanceof THREE.Points) {
							object.geometry.dispose();
							if (Array.isArray(object.material)) {
								object.material.forEach((m) => m.dispose());
							} else {
								object.material.dispose();
							}
						}
					});
					sceneRef.current.renderer.dispose();
					if (containerRef.current && sceneRef.current.renderer.domElement) {
						containerRef.current.removeChild(sceneRef.current.renderer.domElement);
					}
				}
			};
		} catch (e) {
			console.error("WebGL not supported or error creating context", e);
			setHasError(true);
		}
	}, []);

	if (hasError) return null;

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 z-[1]', className)}
			{...props}
		/>
	);
}
