import { createContext } from '$lib/utils/create-context'
import type { UseQrCodeReturn } from './use-qr-code.svelte.ts'

export interface UseQrCodeContext extends UseQrCodeReturn {}
export const [QrCodeProvider, useQrCodeContext] = createContext<UseQrCodeContext>({
  name: 'QrCodeContext',
})
