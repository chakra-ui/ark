import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeOverlayProps extends HTMLArkProps<'div'> {}

export const QrCodeOverlay = (props: QrCodeOverlayProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(() => qrCode().getOverlayProps(), props)

  return <ark.div {...mergedProps} />
}
