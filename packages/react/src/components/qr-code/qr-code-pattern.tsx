import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export type QrCodePatternBaseProps = {}
export interface QrCodePatternProps extends HTMLArkProps<'path'>, QrCodePatternBaseProps {}

export const QrCodePattern = forwardRef<SVGPathElement, QrCodePatternProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getPatternProps(), props)

  return <ark.path {...mergedProps} ref={ref} />
})

QrCodePattern.displayName = 'QrCodePattern'
