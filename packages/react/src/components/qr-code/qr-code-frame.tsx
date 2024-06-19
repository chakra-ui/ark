import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeFrameBaseProps extends PolymorphicProps {}
export interface QrCodeFrameProps extends HTMLProps<'svg'>, QrCodeFrameBaseProps {}

export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getFrameProps(), props)

  return <ark.svg {...mergedProps} ref={ref} />
})

QrCodeFrame.displayName = 'QrCodeFrame'
