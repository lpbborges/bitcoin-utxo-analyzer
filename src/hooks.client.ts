import { Buffer } from 'buffer'
if (typeof window !== 'undefined') {
	// @ts-expect-error Assigning buffer
	window.Buffer = Buffer
}
