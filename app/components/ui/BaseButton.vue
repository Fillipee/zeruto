<script setup lang="ts">
import { computed, resolveComponent } from 'vue';

interface Props {
	class?: string;
	href?: string;
	variant?: 'ghost' | 'outline';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'outline',
});

const isAnchor = computed(() => props.href?.startsWith('#'));

const componentTag = computed(() => {
	if (isAnchor.value) return 'a';
	return props.href ? resolveComponent('NuxtLink') : 'button';
});

const buttonClasses = computed(() => {
	const baseClasses = 'px-4 py-2 tracking-normal md:tracking-widest font-mono transition';

	const variantClasses = {
		outline: 'border border-primary hover:bg-primary hover:text-white',
		ghost: 'text-muted hover:text-primary',
	};

	return [baseClasses, variantClasses[props.variant], props.class];
});
</script>

<template>
	<component
		:is="componentTag"
		:to="!isAnchor ? props.href : undefined"
		:href="isAnchor ? props.href : undefined"
		:class="buttonClasses"
	>
		<slot />
	</component>
</template>
