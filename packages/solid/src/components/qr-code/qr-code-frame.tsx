import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeFrameBaseProps extends PolymorphicProps<'svg'> {}
export interface QrCodeFrameProps
  extends JSX.SvgSVGAttributes<SVGSVGElement>,
    QrCodeFrameBaseProps {}

export const QrCodeFrame = (props: QrCodeFrameProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(() => qrCode().getFrameProps(), props)

  return <ark.svg {...mergedProps} />
}
