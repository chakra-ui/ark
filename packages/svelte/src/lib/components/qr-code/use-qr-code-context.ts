import { createContext } from '$lib/utils/create-context'
import type { UseQrCodeReturn } from './use-qr-code.svelte'

export interface UseQrCodeContext extends UseQrCodeReturn {}
export const [QrCodeProvider, useQrCodeContext] = createContext<UseQrCodeContext>({
  key: 'QrCodeContext',
})
