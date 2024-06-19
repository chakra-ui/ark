import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseQrCodeProps, useQrCode } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'

export interface QrCodeRootBaseProps extends UseQrCodeProps, PolymorphicProps<'div'> {}
export interface QrCodeRootProps extends HTMLProps<'div'>, QrCodeRootBaseProps {}

export const QrCodeRoot = (props: QrCodeRootProps) => {
  const [useQrCodeProps, restProps] = createSplitProps<UseQrCodeProps>()(props, [
    'encoding',
    'id',
    'ids',
    'value',
  ])

  const api = useQrCode(useQrCodeProps)
  const mergedProps = mergeProps(() => api().getRootProps(), restProps)

  return (
    <QrCodeProvider value={api}>
      <ark.div {...mergedProps} />
    </QrCodeProvider>
  )
}
