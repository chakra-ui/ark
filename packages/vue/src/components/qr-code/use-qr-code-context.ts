import { createContext } from '../../utils'
import type { UseQrCodeReturn } from './use-qr-code'

export interface UseQrCodeContext extends UseQrCodeReturn {}

export const [QrCodeProvider, useQrCodeContext] = createContext<UseQrCodeContext>('QrCodeContext')
