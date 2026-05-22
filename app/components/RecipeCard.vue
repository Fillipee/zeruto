<script setup lang="ts">
import type { RecipeDocument } from '~/types/recipe';

const props = defineProps<{
	recipe: RecipeDocument;
	index: number;
}>();

const category = computed(() => props.recipe.data.tags[0] || 'Bez kategorie');
const displayIndex = computed(() => (props.index + 1).toString().padStart(2, '0'));

const metaItems = computed(() => {
	const items = [];
	if (props.recipe.data.difficulty) items.push({ label: 'Obtížnost', value: props.recipe.data.difficulty });
	if (props.recipe.data.servings) items.push({ label: 'Počet porcí', value: props.recipe.data.servings });
	return items;
});
</script>

<template>
	<NuxtLink
		:to="`/recepty/${recipe.slug}`"
		class="group block"
	>
		<article
			class="p-6 cursor-pointer transition border border-border group-hover:border-primary"
		>
			<div class="aspect-[4/3] relative mb-6 overflow-hidden">
				<NuxtImg
					v-if="recipe.data.image"
					:src="recipe.data.image"
					:alt="recipe.data.title"
					class="object-cover w-full h-full transition group-hover:scale-105"
				/>
				<span
					class="absolute top-4 left-4 font-mono text-xs px-2 py-1 transition bg-background text-primary group-hover:hidden"
				>
					{{ displayIndex }}
				</span>
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<span class="font-mono text-xs tracking-widest uppercase text-muted-foreground">
						{{ category }}
					</span>
					<span
						v-if="recipe.data.cookTime || recipe.data.timeToCook"
						class="font-mono text-xs text-muted-foreground"
					>
						{{ recipe.data.cookTime || recipe.data.timeToCook }}
					</span>
				</div>

				<BaseHeading
					level="h3"
					variant="h3"
					class="text-balance"
				>
					{{ recipe.data.title }}
				</BaseHeading>

				<p
					v-if="recipe.data.description"
					class="text-sm text-muted leading-relaxed"
				>
					{{ recipe.data.description }}
				</p>

				<div
					v-if="metaItems.length > 0"
					class="flex gap-6 pt-2"
				>
					<div
						v-for="item in metaItems"
						:key="item.label"
						class="flex flex-col"
					>
						<span class="font-mono text-[10px] tracking-widest uppercase text-muted">
							{{ item.label }}
						</span>
						<span class="font-mono text-xs font-bold uppercase">
							{{ item.value }}
						</span>
					</div>
				</div>
			</div>
		</article>
	</NuxtLink>
</template>
