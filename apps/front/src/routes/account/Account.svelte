<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabaseClient';

	export let session: AuthSession;

	let loading = false;
	let username: string | null = null;
	let website: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			const { user } = session;

			const { data, error, status } = await supabaseClient
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
				website = data.website;
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

	const updateProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date()
			};

			let { error } = await supabaseClient.from('profiles').upsert(updates);

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

<form on:submit|preventDefault={updateProfile}>
	<div class="field">
		<label for="email">Email</label>
		<input class="input" id="email" type="text" value={session.user.email} disabled />
	</div>
	<div class="field">
		<label for="username">Name</label>
		<input class="input" id="username" type="text" bind:value={username} />
	</div>
	<div class="field">
		<label for="website">Website</label>
		<input class="input" id="website" type="website" bind:value={website} />
	</div>

	<input
		class="button"
		type="submit"
		value={loading ? 'Loading...' : 'Update'}
		disabled={loading}
	/>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
