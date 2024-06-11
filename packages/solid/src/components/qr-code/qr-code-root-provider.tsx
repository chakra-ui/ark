import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseQrCodeReturn } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'

interface RootProviderProps {
  value: UseQrCodeReturn
}

export interface QrCodeRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const QrCodeRootProvider = (props: QrCodeRootProviderProps) => {
  const [{ value: qrCode }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => qrCode().getRootProps(), localProps)

  return (
    <QrCodeProvider value={qrCode}>
      <ark.div {...mergedProps} />
    </QrCodeProvider>
  )
}
