<script setup lang="ts">
const { fetchRecipeBySlug } = useRecipes();

const route = useRoute();
const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
const slug = typeof slugParam === 'string' ? slugParam : '';

const { data: recipe } = await useAsyncData(`recipe-${slug}`, () => fetchRecipeBySlug(slug));

if (!recipe.value) {
	throw createError({ statusCode: 404, statusMessage: 'Recept nebyl nalezen.' });
}

useSeoMeta({
	title: `${recipe.value.data.title} | Žeru to.`,
	description: recipe.value.data.description || recipe.value.data.title,
	ogTitle: recipe.value.data.title,
	ogDescription: recipe.value.data.description || recipe.value.data.title,
});
</script>

<template>
	<div
		v-if="recipe"
		class="container mx-auto min-h-screen bg-background text-foreground"
	>
		<main class="pt-20">
			<div class="w-full h-[25vh] md:h-[40vh] overflow-hidden">
				<NuxtImg
					v-if="recipe.data.image"
					:src="recipe.data.image"
					:alt="recipe.data.title"
					class="object-cover w-full h-full"
				/>
			</div>

			<div class="border-b border-border py-10">
				<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
					<div>
						<div class="flex gap-4">
							<span
								v-for="tag in recipe.data.tags"
								:key="tag"
								class="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3"
							>
								{{ tag }}
							</span>
						</div>

						<BaseHeading
							level="h2"
							variant="h2"
							class="text-balance"
						>
							{{ recipe.data.title }}
						</BaseHeading>
					</div>
					<RecipeMeta :recipe-data="recipe.data" />
				</div>
			</div>

			<div
				v-if="recipe.data.description"
				class="py-12 border-b border-border"
			>
				<p class="text-lg md:text-xl leading-relaxed text-muted font-sans">
					{{ recipe.data.description }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 border-b border-border">
				<div class="py-10 md:border-r border-border md:pr-12">
					<BaseHeading
						level="h3"
						variant="h4"
						class="mb-6"
					>
						Ingredience
					</BaseHeading>
					<RecipeIngredientsGroup
						v-for="group in recipe.data.ingredients"
						:key="group.title"
						:ingredients-group="group"
					/>
				</div>

				<div class="py-10 md:pl-12">
					<BaseHeading
						level="h3"
						variant="h4"
					>
						Postup
					</BaseHeading>
					<RecipeDirections
						:data="recipe.data"
						:body="recipe.body"
					/>
				</div>
			</div>

			<div
				v-if="recipe.data.note"
				class="py-10 border-b border-border"
			>
				<BaseHeading
					level="h3"
					variant="h4"
					class="mb-4"
				>
					Šéfkuchařův tip
				</BaseHeading>
				<p class="text-muted leading-relaxed font-sans border-l-2 border-primary pl-6 italic">
					{{ recipe.data.note }}
				</p>
			</div>

			<RelatedRecipes :recipe="recipe" />
		</main>
	</div>
</template>
