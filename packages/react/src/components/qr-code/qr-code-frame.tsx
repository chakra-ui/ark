import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export type QrCodeFrameBaseProps = {}
export interface QrCodeFrameProps extends HTMLArkProps<'svg'>, QrCodeFrameBaseProps {}

export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getFrameProps(), props)

  return <ark.svg {...mergedProps} ref={ref} />
})

QrCodeFrame.displayName = 'QrCodeFrame'
