import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeOverlayProps extends HTMLArkProps<'div'> {}

export const QrCodeOverlay = forwardRef<HTMLDivElement, QrCodeOverlayProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getOverlayProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

QrCodeOverlay.displayName = 'QrCodeOverlay'
