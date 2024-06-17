import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseQrCodeReturn } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'

interface RootProviderProps {
  value: UseQrCodeReturn
}

export interface QrCodeRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface QrCodeRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    QrCodeRootProviderBaseProps {}

export const QrCodeRootProvider = forwardRef<HTMLDivElement, QrCodeRootProviderProps>(
  (props, ref) => {
    const [{ value: qrCode }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
    const mergedProps = mergeProps(qrCode.getRootProps(), localProps)

    return (
      <QrCodeProvider value={qrCode}>
        <ark.div {...mergedProps} ref={ref} />
      </QrCodeProvider>
    )
  },
)

QrCodeRootProvider.displayName = 'QrCodeRootProvider'
