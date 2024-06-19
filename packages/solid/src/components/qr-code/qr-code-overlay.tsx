import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeOverlayBaseProps extends PolymorphicProps<'div'> {}
export interface QrCodeOverlayProps extends HTMLProps<'div'>, QrCodeOverlayBaseProps {}

export const QrCodeOverlay = (props: QrCodeOverlayProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(() => qrCode().getOverlayProps(), props)

  return <ark.div {...mergedProps} />
}
