import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseQrCodeProps, useQrCode } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'

export interface QrCodeRootBaseProps extends UseQrCodeProps, PolymorphicProps {}
export interface QrCodeRootProps extends Assign<HTMLProps<'div'>, QrCodeRootBaseProps> {}

export const QrCodeRoot = forwardRef<HTMLDivElement, QrCodeRootProps>((props, ref) => {
  const [qrcodeProps, localProps] = createSplitProps<UseQrCodeProps>()(props, [
    'defaultValue',
    'encoding',
    'id',
    'ids',
    'onValueChange',
    'pixelSize',
    'value',
  ])
  const qrCode = useQrCode(qrcodeProps)
  const mergedProps = mergeProps(qrCode.getRootProps(), localProps)

  return (
    <QrCodeProvider value={qrCode}>
      <ark.div {...mergedProps} ref={ref} />
    </QrCodeProvider>
  )
})

QrCodeRoot.displayName = 'QrcodeRoot'
