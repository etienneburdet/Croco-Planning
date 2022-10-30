<script>
	import { page } from '$app/stores';
	import Auth from './Auth.svelte';
</script>

<svelte:head>
	<title>Supabase + SvelteKit</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if !$page.data.session}
	<Auth />
{:else}
	<h1>Main</h1>
{/if}

<style>
</style>
