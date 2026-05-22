<script setup lang="ts">
import type { RecipeData } from '~/types/recipe';

const props = defineProps<{
	recipeData: RecipeData;
}>();

const metaPills = computed(() => [
	{ label: 'Vaření', value: props.recipeData.cookTime || props.recipeData.timeToCook || '-' },
	{ label: 'Porce', value: props.recipeData.servings || '-' },
	{ label: 'Náročnost', value: props.recipeData.difficulty || '-' },
]);
</script>

<template>
	<div class="grid grid-cols-3 gap-2 sm:gap-6 border border-border">
		<div
			v-for="pill in metaPills"
			:key="pill.label"
			class="flex flex-col items-center px-6 py-4 bg-background"
		>
			<span class="font-mono text-[10px] tracking-widest uppercase text-muted mb-1">
				{{ pill.label }}
			</span>
			<span class="font-mono text-sm font-bold text-primary whitespace-nowrap">
				{{ pill.value }}
			</span>
		</div>
	</div>
</template>
