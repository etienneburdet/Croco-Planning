<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { getProfile, signOut } from '$lib/account';

	export let session: AuthSession | null;

	let username: string | null = null;
	let avatarUrl: string | null = null;

	onMount(async () => {
		if (session) {
			const profile = await getProfile(session);
			if (profile) {
				({ username, avatarUrl } = profile);
			}
		}
	});
</script>

<div id="navbar">
	{#if session}
		<a href="/account">
			<img href={avatarUrl} alt="avatar" />
			<span>{username}</span>
			<button class="button" on:click={signOut}>Déconnexion</button>
		</a>
	{:else}
		<a class="button" href="/">login</a>
	{/if}
</div>

<style>
	#navbar {
		width: 100%;
		display: flex;
		font-size: 0.75rem;
		justify-content: flex-end;
		border-bottom: 1px solid var(--grey-300);
		padding: var(--spacing-100);
		margin-bottom: var(--spacing-100);
	}
</style>
