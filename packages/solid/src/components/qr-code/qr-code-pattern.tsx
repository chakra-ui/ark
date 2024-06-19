import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodePatternBaseProps extends PolymorphicProps<'path'> {}
export interface QrCodePatternProps extends HTMLProps<'path'>, QrCodePatternBaseProps {}

export const QrCodePattern = (props: QrCodePatternProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(() => qrCode().getPatternProps(), props)

  return <ark.path {...mergedProps} />
}
