import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodePatternBaseProps extends PolymorphicProps {}
export interface QrCodePatternProps extends HTMLProps<'path'>, QrCodePatternBaseProps {}

export const QrCodePattern = forwardRef<SVGPathElement, QrCodePatternProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getPatternProps(), props)

  return <ark.path {...mergedProps} ref={ref} />
})

QrCodePattern.displayName = 'QrCodePattern'
