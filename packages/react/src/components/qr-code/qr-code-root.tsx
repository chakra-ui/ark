'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseQrCodeProps, useQrCode } from './use-qr-code.ts'
import { QrCodeProvider } from './use-qr-code-context.ts'

export interface QrCodeRootBaseProps extends UseQrCodeProps, PolymorphicProps {}
export interface QrCodeRootProps extends Assign<HTMLProps<'div'>, QrCodeRootBaseProps> {}

const splitRootProps = createSplitProps<UseQrCodeProps>()

export const QrCodeRoot = forwardRef<HTMLDivElement, QrCodeRootProps>((props, ref) => {
  const [qrcodeProps, localProps] = splitRootProps(props, [
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
