<script setup lang="ts">
import { normalizeString } from '~/utils/normalize';

const { fetchRecipes } = useRecipes();
const route = useRoute();
const router = useRouter();
const searchQuery = ref((route.query.q as string) || '');

watch(() => route.query.q, (newQ) => {
	searchQuery.value = (newQ as string) || '';
});

watch(searchQuery, (newVal) => {
	const query = newVal.trim();
	router.replace({
		query: {
			...route.query,
			q: query || undefined,
		},
	});
});

const title = 'Recepty | Žeru to.';

useSeoMeta({
	title: title,
	ogTitle: title,
});

const { data: recipes } = await useAsyncData('recipes', fetchRecipes);

const filteredRecipes = computed(() => {
	if (!recipes.value) return [];
	if (!searchQuery.value) return recipes.value;

	const query = normalizeString(searchQuery.value);
	return recipes.value.filter((recipe) => {
		const titleMatch = normalizeString(recipe.data.title || '').includes(query);
		const descriptionMatch = recipe.data.description
			? normalizeString(recipe.data.description).includes(query)
			: false;
		const tagMatch = recipe.data.tags.some(tag => normalizeString(tag).includes(query));

		return titleMatch || descriptionMatch || tagMatch;
	});
});
</script>

<template>
	<section
		class="pb-8 md:pb-16 pt-24"
	>
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border pb-4">
			<div>
				<BaseHeading
					level="h2"
					variant="h4"
					class="pb-2"
				>
					Recepty
				</BaseHeading>
				<BaseHeading
					level="h3"
					variant="h3"
				>
					Kolekce nejžranějších receptů
				</BaseHeading>
			</div>
			<div class="w-full md:max-w-xs">
				<BaseInput
					v-model="searchQuery"
					placeholder="Hledat..."
				/>
			</div>
		</div>

		<div
			v-if="filteredRecipes.length"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<RecipeCard
				v-for="(recipe, index) in filteredRecipes"
				:key="recipe.slug"
				:recipe="recipe"
				:index="index"
			/>
		</div>
		<p
			v-else
			class="text-sm text-muted"
		>
			Nebyly nalezeny žádné recepty.
		</p>
		<p class="text-sm text-muted mt-16 italic">
			Fotografie jsou generovány pomocí AI. Jídlo se vždycky sní dřív, než ho stihnu vyfotit.
		</p>
	</section>
</template>
