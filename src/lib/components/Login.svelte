<script>
	import { redirectToAuthUrl } from '$lib/services/spotifyAuth';
	import Button from './Button.svelte';

	const onLoginClick = async () => {
		const code = await redirectToAuthUrl();
		console.log(code);
	};
</script>

<div class="login">
	Login

	<Button
		onClick={() => {
			onLoginClick();
		}}>Log in</Button
	>
</div>
