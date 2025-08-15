const API_URL = 'https://mempool.space/api';

interface Utxo {
	txid: string;
	vout: number;
	value: number;
}

export type UtxoWithAddress = Utxo & { address: string };

export async function fetchUtxosForAddress(address: string): Promise<UtxoWithAddress[]> {
	try {
		const response = await fetch(`${API_URL}/address/${address}/utxo`);
		const data = (await response.json()) as Utxo[];
		console.log({ json: data });

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
