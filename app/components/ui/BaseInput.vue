<script setup lang="ts">
interface Props {
	modelValue?: string | number;
	type?: string;
	placeholder?: string;
	class?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
	type: 'text',
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<template>
	<input
		:value="modelValue"
		:type="type"
		:placeholder="placeholder"
		class="w-full bg-background border border-border px-4 py-3 font-mono text-sm tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-primary transition"
		:class="props.class"
		@input="handleInput"
	>
</template>
