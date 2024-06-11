import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeFrameProps extends HTMLArkProps<'svg'> {}

export const QrCodeFrame = (props: QrCodeFrameProps) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(() => qrCode().getFrameProps(), props)

  return <ark.svg {...mergedProps} />
}
