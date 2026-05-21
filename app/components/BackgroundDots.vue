<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';

const canvasRef = useTemplateRef<HTMLCanvasElement>('dots-canvas');
const colorMode = useColorMode();

let animationId: number;

let activePoint = { x: -9999, y: -9999 };
let startPoint = { x: -9999, y: -9999 };
let targetPoint = { x: -9999, y: -9999 };
let moveStartTime = 0;
const moveDuration = 5000;

const spacing = 40;
const dotRadius = 2;
const influenceRadius = 200;
const maxDisplacement = 25;

let dots: { x: number; y: number; baseX: number; baseY: number }[] = [];

const resize = () => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const dpr = window.devicePixelRatio || 1;
	const rect = canvas.getBoundingClientRect();
	canvas.width = rect.width * dpr;
	canvas.height = rect.height * dpr;
	ctx.scale(dpr, dpr);

	dots = [];
	const cols = Math.ceil(rect.width / spacing) + 1;
	const rows = Math.ceil(rect.height / spacing) + 1;
	const offsetX = (rect.width - (cols - 1) * spacing) / 2;
	const offsetY = (rect.height - (rows - 1) * spacing) / 2;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const x = offsetX + col * spacing;
			const y = offsetY + row * spacing;
			dots.push({ x, y, baseX: x, baseY: y });
		}
	}
};

const getRandomPoint = () => {
	if (dots.length === 0) return { x: -9999, y: -9999 };

	const randomIndex = Math.floor(Math.random() * dots.length);
	const randomDot = dots[randomIndex];

	if (!randomDot) return { x: -9999, y: -9999 };

	return { x: randomDot.baseX, y: randomDot.baseY };
};

const easeInOutSine = (t: number): number => {
	return -(Math.cos(Math.PI * t) - 1) / 2;
};

const getDotRgb = () => {
	return colorMode.value === 'dark' ? '255, 255, 255' : '0, 0, 0';
};

const animate = (timestamp: number) => {
	const canvas = canvasRef.value;
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const rect = canvas.getBoundingClientRect();
	ctx.clearRect(0, 0, rect.width, rect.height);

	if (!moveStartTime) {
		moveStartTime = timestamp;
		startPoint = getRandomPoint();
		targetPoint = getRandomPoint();
		activePoint = { ...startPoint };
	}

	const elapsed = timestamp - moveStartTime;
	const progress = Math.min(elapsed / moveDuration, 1);

	const easeProgress = easeInOutSine(progress);

	activePoint.x = startPoint.x + (targetPoint.x - startPoint.x) * easeProgress;
	activePoint.y = startPoint.y + (targetPoint.y - startPoint.y) * easeProgress;

	if (progress === 1) {
		startPoint = { ...targetPoint };
		targetPoint = getRandomPoint();
		moveStartTime = timestamp;
	}

	const dotRgb = getDotRgb();

	for (const dot of dots) {
		const dx = activePoint.x - dot.baseX;
		const dy = activePoint.y - dot.baseY;
		const dist = Math.sqrt(dx * dx + dy * dy);

		if (dist < influenceRadius) {
			const force = (1 - dist / influenceRadius) * maxDisplacement;
			const angle = Math.atan2(dy, dx);

			const targetX = dot.baseX - Math.cos(angle) * force;
			const targetY = dot.baseY - Math.sin(angle) * force;

			dot.x += (targetX - dot.x) * 0.1;
			dot.y += (targetY - dot.y) * 0.1;
		}
		else {
			dot.x += (dot.baseX - dot.x) * 0.1;
			dot.y += (dot.baseY - dot.y) * 0.1;
		}

		let opacity = 0.15;
		if (dist < influenceRadius * 1.5) {
			opacity = 0.15 + (1 - dist / (influenceRadius * 1.5)) * 0.85;
		}

		ctx.beginPath();
		ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(${dotRgb}, ${opacity})`;
		ctx.fill();
	}

	animationId = requestAnimationFrame(animate);
};

onMounted(() => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	resize();
	window.addEventListener('resize', resize);

	animationId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', resize);
	cancelAnimationFrame(animationId);
});
</script>

<template>
	<canvas
		ref="dots-canvas"
		class="absolute w-full h-[calc(100%-68px)] -z-10 touch-none"
	/>
</template>
