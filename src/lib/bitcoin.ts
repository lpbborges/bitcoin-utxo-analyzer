import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';
import Bip32 from 'bip32';
import { type UtxoWithAddress, fetchUtxosForAddress } from './mempool-api';

const bip32 = Bip32(tinysecp);
const GAP_LIMIT_DEFAULT = 20;

export async function getWalletUtxos(xpub: string): Promise<UtxoWithAddress[]> {
	const addresses = deriveAddresses(xpub);

	const promises = addresses.map((address) => fetchUtxosForAddress(address));

	const results = await Promise.all(promises);

	const utxos = results.flat();

	return utxos;
}

function deriveAddresses(xpub: string, count = GAP_LIMIT_DEFAULT): string[] {
	const addresses: string[] = [];
	const network = bitcoin.networks.bitcoin;
	const node = bip32.fromBase58(xpub, network);

	// i = 0 for receiving addresses
	// i = 1 for change addresses
	for (let i = 0; i < 1; i++) {
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
