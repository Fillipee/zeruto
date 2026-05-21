<template>
	<section class="min-h-screen flex flex-col justify-end pt-24 pb-16 md:pb-32">
		<div class="relative flex-1 flex items-start">
			<BackgroundDots />
			<BaseHeading
				level="h1"
				class="pr-6 bg-background after:content-[''] after:inline-block after:size-4 md:after:size-6 after:bg-primary"
			>
				Žeru<br>to
			</BaseHeading>
		</div>
		<hr class="text-border mb-8 md:mb-16">
		<div class="grid md:grid-cols-3">
			<p>Žranice jako prase.</p>
			<div
				class="lg:col-span-2 flex mt-4 md:mt-0 md:justify-end items-center gap-4"
			>
				<BaseButton href="/recepty">
					Recepty
				</BaseButton>
			</div>
		</div>
	</section>
</template>
