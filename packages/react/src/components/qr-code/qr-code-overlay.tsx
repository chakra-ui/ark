import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeOverlayBaseProps extends PolymorphicProps {}
export interface QrCodeOverlayProps
  extends HTMLAttributes<HTMLDivElement>,
    QrCodeOverlayBaseProps {}

export const QrCodeOverlay = forwardRef<HTMLDivElement, QrCodeOverlayProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getOverlayProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

QrCodeOverlay.displayName = 'QrCodeOverlay'
