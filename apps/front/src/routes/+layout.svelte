<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from './Nav.svelte';
	import Auth from './Auth.svelte';

	export let data: import('./$types').PageData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div>
	{#if !$page.data.session}
		<Auth />
	{:else}
		<Nav session={data.session} />
		<slot />
	{/if}
</div>

<style>
	div {
		height: 100%;
		width: 100%;
		padding: var(--spacing-50);
	}
</style>
