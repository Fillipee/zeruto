<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const siteUrl = config.public.siteUrl;
const title = 'Žeru to.';
const description = 'Žranice jako prase.';

useSeoMeta({
	title: title,
	description: description,
	ogTitle: title,
	ogDescription: description,
	ogImage: `${siteUrl}/og-image.png`,
	ogUrl: new URL(route.path, siteUrl).href,
	ogType: 'website',
	ogLocale: 'cs-CZ',
	robots: 'index, follow',
});
</script>

<template>
	<NuxtLayout>
		<HeroSection />
	</NuxtLayout>
</template>
