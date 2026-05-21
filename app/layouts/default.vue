<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const siteUrl = config.public.siteUrl;
const description = 'Žranice jako prase.';

useSeoMeta({
	description: description,
	ogDescription: description,
	ogImage: `${siteUrl}/og-image.png`,
	ogUrl: new URL(route.path, siteUrl).href,
	ogType: 'website',
	ogLocale: 'cs-CZ',
	robots: 'index, follow',
});
</script>

<template>
	<div>
		<AppHeader />
		<main class="container mx-auto px-4">
			<slot />
		</main>
		<ThemeToggle />
	</div>
</template>
