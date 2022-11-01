<script lang="ts">
	import Password from './Password.svelte';

	export let data: import('./$types').PageData;
</script>

{#if data?.session}
	<Password session={data.session} />
{/if}
