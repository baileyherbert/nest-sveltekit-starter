<script lang="ts">
	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style global lang="scss">
	@import '../styles/tailwind.css';
</style>
