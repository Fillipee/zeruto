<script setup lang="ts">
import type { RecipeIngredientGroup } from '~/types/recipe';

const props = defineProps<{
	ingredientsGroup: RecipeIngredientGroup;
}>();
</script>

<template>
	<div class="mb-12 last:mb-0">
		<BaseHeading
			v-if="props.ingredientsGroup.title"
			level="h4"
			variant="h3"
			class="mb-2 font-black text-sm tracking-wide"
		>
			{{ props.ingredientsGroup.title }}
		</BaseHeading>
		<ul class="divide-y divide-border">
			<li
				v-for="item in props.ingredientsGroup.items"
				:key="item"
				class="py-2"
			>
				<span class="text-foreground font-sans text-sm leading-relaxed">
					{{ item }}
				</span>
			</li>
		</ul>
	</div>
</template>
