export interface Utxo {
	txid: string
	vout: number
	value: number
}

export type UtxoWithAddress = Utxo & { address: string }

export type AnalyzedUtxo = UtxoWithAddress & {
	isDust: boolean
}

export interface FeeRates {
	fastestFee: number
	halfHourFee: number
	hourFee: number
	economyFee: number
	minimumFee: number
}
