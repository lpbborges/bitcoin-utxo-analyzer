<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte'

	import { getWalletUtxos } from '$lib/bitcoin'
	import DustPill from '$lib/components/DustPill.svelte'

	import type { AnalyzedUtxo } from '$lib/types'

	let xpub = ''
	let errorMessage = ''
	let isLoading = false
	let utxos: AnalyzedUtxo[] = []
	let totalBalance = 0

	function clean() {
		errorMessage = ''
		isLoading = false
		utxos = []
		totalBalance = 0
	}

	async function handleClick() {
		if (!xpub) {
			errorMessage = 'Please enter a xpub.'
			return
		}

		if (!xpub.startsWith('xpub')) {
			errorMessage = 'Not a valid xpub.'
			return
		}

		clean()

		try {
			isLoading = true
			const foundUtxos = await getWalletUtxos(xpub)

			if (foundUtxos.length === 0) {
				throw new Error('0 Utxo found for this wallet.')
			}

			utxos = foundUtxos
			totalBalance = utxos.reduce((sum, utxo) => sum + utxo.value, 0)
		} catch (err: unknown) {
			if (err instanceof Error) {
				errorMessage = err.message
			}
		} finally {
			isLoading = false
		}
	}
</script>

<main class=" min-h-screen w-full bg-gray-900 p-8 text-gray-100">
	<div class="text-center">
		<h1 class="mb-2 text-4xl font-bold text-orange-500">Bitcoin UTXO Analyzer</h1>
	</div>

	<div class="mx-auto mt-8 max-w-2xl">
		<div class="flex flex-col gap-2">
			<label for="xpub-input" class="font-semibold text-gray-300">Enter your xpub</label>
			<input
				bind:value={xpub}
				id="xpub-input"
				type="text"
				placeholder="xpub..."
				class="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
			/>
			<button
				on:click={handleClick}
				class="mt-2 w-full rounded-md bg-orange-600 px-4 py-3 font-bold text-white transition-colors duration-200 hover:bg-orange-700 disabled:bg-orange-600/30 disabled:text-white/70"
				disabled={isLoading}
			>
				{#if isLoading}
					<span>Analyzing...</span>
				{:else}
					<span>Analyze Wallet</span>
				{/if}
			</button>
		</div>
	</div>

	<div class="mx-auto mt-12 max-w-4xl">
		{#if errorMessage}
			<p class="rounded-md bg-red-900/50 p-4 text-center text-red-400">{errorMessage}</p>
		{/if}

		{#if isLoading}
			<div class="flex w-full items-center justify-center gap-2">
				<p class="text-center text-gray-300">Fetching data from the blockchain...</p>

				<LoaderCircle class="animate-spin" />
			</div>
		{/if}
		{#if utxos.length > 0 && !isLoading}
			<div class="rounded-lg bg-gray-800/50 p-4">
				<h2 class="mb-4 text-2xl font-bold">Analysis Results</h2>
				<p class="mb-4 text-lg">
					Found <span class="font-bold">{utxos.length}</span> UTXOs. Total balance:
					<span class="font-bold text-orange-400">{totalBalance.toLocaleString()} sats</span>
				</p>

				<div class="overflow-x-auto">
					<table class="min-w-full text-left text-sm">
						<thead class="border-b border-gray-600">
							<tr>
								<th class="p-2">Value (sats)</th>
								<th class="p-2">Address</th>
								<th class="p-2">TXID</th>
								<th class="p-2">Status</th>
							</tr>
						</thead>
						<tbody>
							{#each utxos as utxo (utxo.txid + utxo.vout)}
								<tr class="border-b border-gray-700 hover:bg-gray-700/50">
									<td class="p-2 font-semibold text-orange-400">{utxo.value.toLocaleString()}</td>
									<td class="max-w-xs truncate p-2">{utxo.address}</td>
									<td class="max-w-xs truncate p-2" title={utxo.txid}>
										{utxo.txid.slice(0, 10)}...{utxo.txid.slice(-10)}
									</td>
									<td class="max-w-xs truncate p-2">
										{#if !utxo.isDust}
											<DustPill />
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</main>
