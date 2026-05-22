<script setup lang="ts">
import type { RecipeData, RecipeDocument } from '~/types/recipe';

const props = defineProps<{
	data: RecipeData;
	body: RecipeDocument['body'];
}>();
</script>

<template>
	<div class="prose prose-invert max-w-none">
		<MDCRenderer
			:body="props.body"
			:data="props.data"
		/>
	</div>
</template>

<style scoped>
.prose :deep(ol) {
	list-style: none !important;
	padding-left: 0 !important;
	counter-reset: step;
}

.prose :deep(ol li) {
	display: flex;
	gap: 1rem;
	padding: 1rem 0 !important;
	color: var(--color-primary);
	border-bottom: 1px solid var(--color-border);
	position: relative;
}

@media (min-width: 768px) {
	.prose :deep(ol li) {
		gap: 2.5rem;
	}
}

.prose :deep(ol li::before) {
	counter-increment: step;
	content: counter(step, decimal-leading-zero);
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	font-size: 0.75rem;
	color: var(--color-muted);
	width: 1.5rem;
	flex-shrink: 0;
}

.prose :deep(ol li:last-child) {
	border-bottom: none;
}

.prose :deep(ol) {
	margin-top: 0 !important;
	margin-bottom: 0 !important;
}
</style>
