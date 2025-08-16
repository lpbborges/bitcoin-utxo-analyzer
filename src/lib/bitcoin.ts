import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';
import Bip32 from 'bip32';
import { fetchUtxosForAddress, getFeeRates } from './mempool-api';

import type { AnalyzedUtxo, UtxoWithAddress } from './types';

const bip32 = Bip32(tinysecp);
const GAP_LIMIT_DEFAULT = 20;

export async function getWalletUtxos(xpub: string): Promise<AnalyzedUtxo[]> {
	const addresses = deriveAddresses(xpub);

	const promises = addresses.map((address) => fetchUtxosForAddress(address));

	const results = await Promise.all(promises);

	const flatennedResults = results.flat();

	const feeRates = await getFeeRates();

	const utxos = flatennedResults.map((utxo) => {
		return {
			...utxo,
			isDust: checkUtxoIsDust(utxo, feeRates.economyFee)
		};
	});

	return utxos;
}

function deriveAddresses(xpub: string, count = GAP_LIMIT_DEFAULT): string[] {
	const addresses: string[] = [];
	const network = bitcoin.networks.bitcoin;
	const node = bip32.fromBase58(xpub, network);

	// i = 0 for receiving addresses
	// i = 1 for change addresses
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < count; j++) {
			const child = node.derive(i).derive(j);
			const { address } = bitcoin.payments.p2wpkh({
				pubkey: Buffer.from(child.publicKey),
				network
			});

			if (address) {
				addresses.push(address);
			}
		}
	}

	return addresses;
}

const INPUT_SIZE_IN_VBYTES = 68;

function checkUtxoIsDust(utxo: UtxoWithAddress, fee: number): boolean {
	const spendingCost = INPUT_SIZE_IN_VBYTES * fee;

	return utxo.value <= spendingCost;
}
