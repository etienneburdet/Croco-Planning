<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabaseClient';

	export let session: AuthSession | null;

	let loading = false;
	let username: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		if (!session) {
			return;
		}

		try {
			const { user } = session;

			const { data, error, status } = await supabaseClient
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
				avatarUrl = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const signOut = async () => {
		try {
			loading = true;
			let { error } = await supabaseClient.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<div id="navbar">
	{#if session}
		<a href="/account">
			<img href={avatarUrl} alt="avatar" />
			<span>{username}</span>
			<button class="button" on:click={signOut} disabled={loading}>Déconnexion</button>
		</a>
	{:else}
		<a class="button" href="/">login</a>
	{/if}
</div>

<style>
	#navbar {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		font-size: 0.75rem;
		justify-content: flex-end;
		border-bottom: 1px solid var(--grey-300);
		padding: var(--spacing-100);
		margin-bottom: var(--spacing-100);
	}
</style>
