import { createContext } from '../../utils/create-context.ts'
import type { UseQrCodeReturn } from './use-qr-code.ts'

export interface UseQrCodeContext extends UseQrCodeReturn {}

export const [QrCodeProvider, useQrCodeContext] = createContext<UseQrCodeContext>('QrCodeContext')
