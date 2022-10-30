<script lang="ts">
	import Account from './Account.svelte';

	export let data: import('./$types').PageData;
</script>

{#if data?.session}
	<Account session={data.session} />
{/if}
