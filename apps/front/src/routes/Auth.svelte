<script lang="ts">
	import { slide } from 'svelte/transition';
	import { supabaseClient } from '$lib/supabaseClient';
	import DottedBackground from '$lib/DottedBackground.svelte';

	let loading = false;
	let email: string;
	let password: string = '';

	let isLoginPw: boolean = false;

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

	const toggleLoginMethod = () => (isLoginPw = !isLoginPw);

	$: createPw = password.length === 0;
</script>

<DottedBackground>
	<form on:submit|preventDefault={isLoginPw ? loginPw : loginMagic}>
		<div id="form-fields">
			<h1>Les crocos</h1>
			<span>{isLoginPw ? 'Entre ton mail 🐊' : 'Entre ton mail et ton mot de passe🐊'}</span>
			<input class="input" type="email" placeholder="e-mail" bind:value={email} />
			{#if isLoginPw}
				<input
					transition:slide
					class="input password"
					class:isLoginPw
					type="password"
					placeholder="Mot de passe"
					bind:value={password}
				/>
			{/if}
			<input
				class="button"
				type="submit"
				value={isLoginPw && createPw ? '(Ré)-initialiser le mot de passe' : 'Connextion'}
				disabled={loading}
			/>
			<button class="link" on:click={toggleLoginMethod} on:keypress={toggleLoginMethod}>
				{isLoginPw ? 'Ne pas utiliser de mot de passe' : 'Utiliser un mot de passe'}
			</button>
		</div>
	</form>
</DottedBackground>

<style>
	form {
		height: 100%;
		width: 100%;
		padding-top: 10vh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	#form-fields {
		background: white;
		max-width: 320px;
		border: 1px solid var(--grey-300);
		border-radius: var(--border-radius);
		padding: var(--spacing-100);
		box-shadow: var(--box-shadow-100);
	}

	input {
		font-size: 1rem;
		width: 100%;
		margin: 0.75em 0;
	}

	.link {
		font-size: 0.75rem;
	}
</style>
