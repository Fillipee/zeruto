<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	class?: string;
	level: 'h1' | 'h2' | 'h3' | 'h4';
	variant?: 'h1' | 'h2' | 'h3' | 'h4';
}

const props = defineProps<Props>();

const variant = computed(() => {
	return props.variant ? props.variant : props.level;
});

const classes = computed(() => {
	const baseClasses = 'uppercase font-inter';

	const variantClasses = {
		h1: 'text-7xl md:text-9xl tracking-tighter font-black',
		h2: 'text-5xl md:text-6xl uppercase tracking-tighter font-bold',
		h3: 'text-2xl tracking-tight font-bold',
		h4: 'text-xs tracking-widest font-mono',
	};

	return [baseClasses, variantClasses[variant.value], props.class];
});
</script>

<template>
	<component
		:is="level"
		:class="classes"
	>
		<slot />
	</component>
</template>
