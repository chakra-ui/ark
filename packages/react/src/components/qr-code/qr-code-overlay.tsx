import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeOverlayBaseProps extends PolymorphicProps {}
export interface QrCodeOverlayProps extends HTMLProps<'div'>, QrCodeOverlayBaseProps {}

export const QrCodeOverlay = forwardRef<HTMLDivElement, QrCodeOverlayProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getOverlayProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

QrCodeOverlay.displayName = 'QrCodeOverlay'
