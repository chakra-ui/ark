import { mergeProps } from '@zag-js/react'
import { type SVGProps, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeFrameBaseProps extends PolymorphicProps {}
export interface QrCodeFrameProps extends SVGProps<SVGSVGElement>, QrCodeFrameBaseProps {}

export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getFrameProps(), props)

  return <ark.svg {...mergedProps} ref={ref} />
})

QrCodeFrame.displayName = 'QrCodeFrame'
