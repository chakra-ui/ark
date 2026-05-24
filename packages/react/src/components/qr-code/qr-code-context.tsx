'use client'

import type { ReactNode } from 'react'
import { type UseQrCodeContext, useQrCodeContext } from './use-qr-code-context.ts'

export interface QrCodeContextProps {
  children: (context: UseQrCodeContext) => ReactNode
}

export const QrCodeContext = (props: QrCodeContextProps) => props.children(useQrCodeContext())
