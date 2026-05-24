import type { JSX } from 'solid-js'
import { type UseQrCodeContext, useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodeContextProps {
  children: (context: UseQrCodeContext) => JSX.Element
}

export const QrCodeContext = (props: QrCodeContextProps) => props.children(useQrCodeContext())
