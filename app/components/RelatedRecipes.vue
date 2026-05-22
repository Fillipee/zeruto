<script setup lang="ts">
import type { RecipeDocument } from '~/types/recipe';

const props = defineProps<{
	recipe: RecipeDocument;
}>();

const { fetchRecipes } = useRecipes();
const { data: allRecipes } = await useAsyncData('recipes-all', fetchRecipes);

const relatedRecipes = computed(() => {
	if (!allRecipes.value) return [];
	const currentTags = props.recipe.data.tags;
	return allRecipes.value
		.filter(r => r.slug !== props.recipe.slug && r.data.tags.some(t => currentTags.includes(t)));
});
</script>

<template>
	<div
		v-if="relatedRecipes.length > 0"
		class="py-16"
	>
		<BaseHeading
			level="h3"
			variant="h4"
			class="mb-4"
		>
			Další {{ recipe.data.tags[0] }}
		</BaseHeading>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<NuxtLink
				v-for="r in relatedRecipes"
				:key="r.slug"
				:to="`/recepty/${r.slug}`"
				class="group bg-background p-6 flex gap-6 transition border-b border-r border-l border-border first:border-t md:[&:nth-child(even)]:border-l-0 md:[&:nth-child(2)]:border-t"
			>
				<div class="size-24 relative overflow-hidden border border-border">
					<NuxtImg
						v-if="r.data.image"
						:src="r.data.image"
						:alt="r.data.title"
						class="object-cover w-full h-full group-hover:scale-105 transition"
					/>
				</div>
				<div class="flex flex-col justify-center gap-1">
					<span
						v-if="r.data.timeToCook"
						class="font-mono text-[10px] tracking-widest uppercase text-muted"
					>
						{{ r.data.timeToCook }}
					</span>
					<h3 class="font-black uppercase tracking-tight text-lg decoration-1 group-hover:underline underline-offset-2">
						{{ r.data.title }}
					</h3>
					<p
						v-if="r.data.description"
						class="text-sm text-muted line-clamp-2 leading-relaxed"
					>
						{{ r.data.description }}
					</p>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>
