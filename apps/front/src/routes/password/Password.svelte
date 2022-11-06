<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let password: string = '';

	const updatePassword = async () => {
		try {
			let { error } = await supabaseClient.auth.updateUser({ password });
			console.log(error);
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	};
</script>

<form on:submit|preventDefault={updatePassword}>
	<div class="field">
		<label for="password">Password</label>
		<input class="input" id="email" type="text" bind:value={password} />
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
