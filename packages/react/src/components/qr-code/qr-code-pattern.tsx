import { mergeProps } from '@zag-js/react'
import { type SVGProps, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodePatternBaseProps extends PolymorphicProps {}
export interface QrCodePatternProps extends SVGProps<SVGPathElement>, QrCodePatternBaseProps {}

export const QrCodePattern = forwardRef<SVGPathElement, QrCodePatternProps>((props, ref) => {
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(qrCode.getPatternProps(), props)

  return <ark.path {...mergedProps} ref={ref} />
})

QrCodePattern.displayName = 'QrCodePattern'
