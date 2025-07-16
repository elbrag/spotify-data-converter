<script lang="ts">
	import Checkbox from './Checkbox.svelte';

	export let name: string;
	export let id: string;
	export let onClick: () => void | undefined = () => undefined;
	export let checked: boolean;
</script>

<li class="w-full">
	<Checkbox
		{id}
		label={name}
		{checked}
		{onClick}
		className="h-full w-full cursor-pointer rounded-sm border border-white px-5 py-4 lg:px-6 lg:py-5"
	/>
</li>
