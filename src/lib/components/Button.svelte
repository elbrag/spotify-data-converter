<script lang="ts">
	export let href: string | undefined = undefined;
	export let onClick: () => void | undefined = () => undefined;
	export let type: 'button' | 'submit' = 'button';
	export let disabled: boolean = false;
	export let className: string = '';

	const classNames = `${className} py-2 px-4 bg-purple-400`;
</script>

{#if href}
	<a {href} class="button {classNames}" class:disabled on:click|preventDefault={onClick}>
		<slot>Default Link Text</slot>
	</a>
{:else}
	<button {type} class="button {classNames}" {disabled} on:click={onClick}>
		<slot>Default Button Text</slot>
	</button>
{/if}
