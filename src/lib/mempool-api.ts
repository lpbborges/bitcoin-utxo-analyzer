import type { FeeRates, Utxo, UtxoWithAddress } from './types';

const API_URL = 'https://mempool.space/api';

export async function fetchUtxosForAddress(address: string): Promise<UtxoWithAddress[]> {
	try {
		const response = await fetch(`${API_URL}/address/${address}/utxo`);
		const data = (await response.json()) as Utxo[];

		if (data.length === 0) {
			throw new Error('No UTXO found');
		}

		return data.map((utxo: Utxo) => ({
			...utxo,
			address: address
		}));
	} catch (error) {
		console.error(`Failed to fetch UTXOs for address ${address}:`, error);
		return [];
	}
}

export async function getFeeRates(): Promise<FeeRates> {
	try {
		const response = await fetch(`${API_URL}/v1/fees/recommended`);
		const data = (await response.json()) as FeeRates;

		if (!response.ok) {
			throw new Error(`Failed to fetch fee rates with status ${response.status}`);
		}

		return data;
	} catch (err) {
		console.error('Failed to get fee rates:', err);

		throw err;
	}
}
