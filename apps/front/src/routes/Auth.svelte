<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let email: string;
	let password: string;

	const loginPw = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const loginMagic = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOtp({ email });
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

<!-- <form on:submit|preventDefault={loginMagic}>
	<div id="form-fields">
		<h1>Les crocos</h1>
		<p>Entre ton mail pour recevoir un lien de connexion 🐊</p>
		<input class="input" type="email" placeholder="e-mail" bind:value={email} />
		<input
			class="button"
			type="submit"
			value={loading ? 'Loading' : 'Recevoir le lien'}
			disabled={loading}
		/>
	</div>
</form> -->

<form on:submit|preventDefault={loginPw}>
	<div id="form-fields">
		<h1>Les crocos</h1>
		<p>Entre ton mail et ton mot de passe 🐊</p>
		<input class="input" type="email" placeholder="e-mail" bind:value={email} />
		<input class="input" type="password" placeholder="Mot de pass" bind:value={password} />
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
