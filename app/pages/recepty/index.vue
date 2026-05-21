<script setup lang="ts">
const { fetchRecipes } = useRecipes();

const title = 'Recepty | Žeru to.';

useSeoMeta({
	title: title,
	ogTitle: title,
});

const { data: recipes } = await useAsyncData('recipes', fetchRecipes);
</script>

<template>
	<section
		class="pb-16 md:pb-32 pt-24"
	>
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
			class="pb-4 mb-8 border-b border-border"
		>
			Kolekce nejžranějších receptů
		</BaseHeading>

		<div
			v-if="recipes?.length"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<RecipeCard
				v-for="(recipe, index) in recipes"
				:key="recipe.slug"
				:recipe="recipe"
				:index="index"
			/>
		</div>
		<p
			v-else
			class="text-sm text-gray-500"
		>
			Zatím tu žádné recepty nejsou.
		</p>
	</section>
</template>
