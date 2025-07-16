<script lang="ts">
	export let checked: boolean = false;
	export let onClick: (e: Event) => void | undefined = () => undefined;
	export let disabled: boolean = false;
	export let className: string = '';
	export let label: string;
	export let color: 'black' | 'white' = 'white';
	export let id: string;

	const classNames = `${className} ${disabled ? 'opacity-50 cursor-disabled' : 'cursor-pointer'} py-2 flex items-center justify-center gap-4`;
</script>

<label for={id} class={classNames}>
	<div class="grid h-8 w-8 grid-cols-1 grid-rows-1">
		<input
			type="checkbox"
			onclick={onClick}
			class="col-start-1 row-start-1 h-full w-full opacity-0"
			{id}
			name={id}
			{checked}
			{disabled}
		/>
		<div
			class={`mock-box h-full w-full rounded-sm border border-${color} col-start-1 row-start-1`}
		></div>
		<div class="relative col-start-1 row-start-1 h-full w-full">
			<div
				class={`checkmark absolute top-1/2 left-1/2  h-2.5 w-4 -translate-x-1/2 -translate-y-3/4 -rotate-45 transform border-b-2 border-l-2 border-green-500 ${checked ? 'block' : 'hidden'}`}
			></div>
		</div>
	</div>

	{label}
</label>
