import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseQrCodeProps, useQrCode } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'

export interface QrCodeRootProps extends Assign<HTMLArkProps<'div'>, UseQrCodeProps> {}

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
