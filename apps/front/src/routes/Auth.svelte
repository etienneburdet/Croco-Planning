<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<form on:submit|preventDefault={handleLogin}>
	<div id="form-fields">
		<h1>Les crocos</h1>
		<p>Entre ton mail pour recevoir un lien de connexion 🐊</p>
		<input class="input" type="email" placeholder="Your email" bind:value={email} />
		<input
			class="button"
			type="submit"
			value={loading ? 'Loading' : 'Recevoir le lien'}
			disabled={loading}
		/>
	</div>
</form>

<style>
	form {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10vh;
	}

	#form-fields {
		border: 1px solid var(--grey-300);
		border-radius: var(--border-radius);
		padding: var(--spacing-100);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		font-size: 1rem;
		width: 100%;
		margin: 0.75em 0;
	}
</style>
