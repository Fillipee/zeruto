export const useScrollbar = () => {
	const isNotAtTop = ref(false);

	const handleScroll = () => {
		isNotAtTop.value = window.scrollY > 0;
	};

	onMounted(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
	});

	return { isNotAtTop };
};
