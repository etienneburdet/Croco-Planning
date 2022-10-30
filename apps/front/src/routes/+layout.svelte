<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import type { AuthSession } from '@supabase/supabase-js';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from './Nav.svelte';

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

<Nav session={data.session} />
<div>
	<slot />
</div>

<style>
	div {
		height: 100%;
		width: 100%;
		padding: var(--spacing-50);
	}
</style>
