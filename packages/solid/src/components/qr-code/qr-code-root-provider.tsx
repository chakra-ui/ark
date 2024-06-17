import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseQrCodeReturn } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'

interface RootProviderProps {
  value: UseQrCodeReturn
}

export interface QrCodeRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface QrCodeRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    QrCodeRootProviderBaseProps {}

export const QrCodeRootProvider = (props: QrCodeRootProviderProps) => {
  const [{ value: qrCode }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => qrCode().getRootProps(), localProps)

  return (
    <QrCodeProvider value={qrCode}>
      <ark.div {...mergedProps} />
    </QrCodeProvider>
  )
}
