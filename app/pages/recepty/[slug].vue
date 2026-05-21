<script setup lang="ts">
const { fetchRecipeBySlug, fetchRecipes } = useRecipes();

const route = useRoute();
const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
const slug = typeof slugParam === 'string' ? slugParam : '';

const { data: recipe } = await useAsyncData(`recipe-${slug}`, () => fetchRecipeBySlug(slug));

if (!recipe.value) {
	throw createError({ statusCode: 404, statusMessage: 'Recept nebyl nalezen.' });
}

const { data: allRecipes } = await useAsyncData('recipes-all', fetchRecipes);
const relatedRecipes = computed(() => {
	if (!recipe.value || !allRecipes.value) return [];
	const currentTags = recipe.value.data.tags;
	return allRecipes.value
		.filter(r => r.slug !== slug && r.data.tags.some(t => currentTags.includes(t)));
});

useSeoMeta({
	title: `${recipe.value.data.title} | Žeru to.`,
	description: recipe.value.data.description || recipe.value.data.title,
	ogTitle: recipe.value.data.title,
	ogDescription: recipe.value.data.description || recipe.value.data.title,
});

const metaPills = computed(() => [
	{ label: 'Vaření', value: recipe.value?.data.cookTime || recipe.value?.data.timeToCook || '-' },
	{ label: 'Porce', value: recipe.value?.data.servings || '-' },
	{ label: 'Náročnost', value: recipe.value?.data.difficulty || '-' },
]);
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
					<div
						v-for="group in recipe.data.ingredients"
						:key="group.title"
						class="mb-12 last:mb-0"
					>
						<BaseHeading
							level="h4"
							variant="h3"
							class="mb-2 font-black text-sm tracking-wide"
						>
							{{ group.title }}
						</BaseHeading>
						<ul class="divide-y divide-border">
							<li
								v-for="item in group.items"
								:key="item"
								class="py-2"
							>
								<span class="text-foreground font-sans text-sm leading-relaxed">
									{{ item }}
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div class="py-10 md:pl-12">
					<BaseHeading
						level="h3"
						variant="h4"
					>
						Postup
					</BaseHeading>
					<div class="prose prose-invert">
						<MDCRenderer
							:body="recipe.body"
							:data="recipe.data"
						/>
					</div>
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
		</main>
	</div>
</template>

<style scoped>
:deep(.prose ol) {
	list-style: none;
	padding-left: 0;
	counter-reset: step;
}

:deep(.prose ol li) {
	display: flex;
	gap: 1.5rem;
	padding: 1.5rem 0;
	border-bottom: 1px solid var(--color-border);
	position: relative;
}

@media (min-width: 768px) {
	:deep(.prose ol li) {
		gap: 2.5rem;
	}
}

:deep(.prose ol li::before) {
	counter-increment: step;
	content: counter(step, decimal-leading-zero);
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	font-size: 0.75rem;
	color: var(--color-muted);
	margin-top: 0.25rem;
	width: 1.5rem;
	flex-shrink: 0;
}

:deep(.prose ol li:last-child) {
	border-bottom: none;
}
</style>
