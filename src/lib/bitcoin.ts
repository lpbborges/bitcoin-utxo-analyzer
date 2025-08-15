import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';
import Bip32 from 'bip32';

const bip32 = Bip32(tinysecp);
const GAP_LIMIT_DEFAULT = 20;

export function deriveAddresses(
	xpub: string,
	count = GAP_LIMIT_DEFAULT
): { receivingAddresses: string[]; changeAdresses: string[] } {
	const changeAddresses: string[] = [];
	const receivingAddresses: string[] = [];
	const network = bitcoin.networks.bitcoin;
	const node = bip32.fromBase58(xpub, network);

	for (let i = 0; i < count; i++) {
		const receivingChild = node.derive(0).derive(i);
		const { address: receivingaddress } = bitcoin.payments.p2wpkh({
			pubkey: Buffer.from(receivingChild.publicKey),
			network
		});

		if (receivingaddress) {
			receivingAddresses.push(receivingaddress);
		}

		const changeChild = node.derive(1).derive(i);
		const { address: changeAddress } = bitcoin.payments.p2wpkh({
			pubkey: Buffer.from(changeChild.publicKey),
			network
		});

		if (changeAddress) {
			changeAddresses.push(changeAddress);
		}
	}

	return { receivingAddresses, changeAddresses };
}
