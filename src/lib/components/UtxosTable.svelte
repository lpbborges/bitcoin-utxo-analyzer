<script lang="ts">
	import type { AnalyzedUtxo } from '$lib/types'
	import DustPill from './DustPill.svelte'

	export let utxos: AnalyzedUtxo[] = []
</script>

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
