import type { DownloadTriggerProps } from '@zag-js/qr-code'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

export interface QrCodeDownloadTriggerBaseProps
  extends DownloadTriggerProps,
    PolymorphicProps<'button'> {}
export interface QrCodeDownloadTriggerProps
  extends HTMLProps<'button'>,
    QrCodeDownloadTriggerBaseProps {}

export const QrCodeDownloadTrigger = (props: QrCodeDownloadTriggerProps) => {
  const [downloadTriggerProps, localProps] = createSplitProps<DownloadTriggerProps>()(props, [
    'fileName',
    'mimeType',
    'quality',
  ])
  const qrCode = useQrCodeContext()
  const mergedProps = mergeProps(
    () => qrCode().getDownloadTriggerProps(downloadTriggerProps),
    localProps,
  )

  return <ark.button {...mergedProps} />
}
