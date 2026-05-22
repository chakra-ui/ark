'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodePatternBaseProps extends PolymorphicProps {}
export interface QrCodePatternProps extends HTMLProps<'path'>, QrCodePatternBaseProps {}

export const QrCodePattern = ({ ref, ...props }: QrCodePatternProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getPatternProps(), props)

  return <ark.path {...mergedProps} ref={ref} />
}

QrCodePattern.displayName = 'QrCodePattern'
