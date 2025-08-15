<script lang="ts">
	import { deriveAddresses } from '$lib/bitcoin';
	let xpub = '';

	function handleClick() {
		const { receivingAddresses, changeAdresses } = deriveAddresses(xpub);
		console.log({ receivingAddresses, changeAdresses });
	}
</script>

<main class="container mx-auto min-h-screen bg-gray-900 p-8 text-gray-100">
	<div class="text-center">
		<h1 class="mb-2 text-4xl font-bold text-orange-500">Bitcoin UTXO Health Analyzer</h1>
		<p class="text-lg text-gray-400">Analyze the health of your Bitcoin wallet.</p>
	</div>

	<div class="mx-auto mt-8 max-w-2xl">
		<div class="flex flex-col gap-2">
			<label for="xpub-input" class="font-semibold text-gray-300"> Insert your xpub </label>
			<input
				bind:value={xpub}
				id="xpub-input"
				type="text"
				placeholder="xpub..."
				class="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
			/>
			<button
				on:click={handleClick}
				class="mt-2 w-full rounded-md bg-orange-600 px-4 py-3 font-bold text-white transition-colors duration-200 hover:bg-orange-700"
			>
				Analyze Wallet
			</button>
		</div>
	</div>
</main>
