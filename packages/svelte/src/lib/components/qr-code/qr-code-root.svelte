<script module lang="ts">
import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
import type { UseQrCodeProps } from './use-qr-code.svelte'

export interface QrCodeRootBaseProps extends UseQrCodeProps, PolymorphicProps<'div'> {}
export interface QrCodeRootProps extends Assign<HTMLProps<'div'>, QrCodeRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { QrCodeProvider } from './use-qr-code-context'
  import { useQrCode } from './use-qr-code.svelte'

  const props: QrCodeRootProps = $props()
  const [useQrCodeProps, localProps] = $derived(
    createSplitProps<UseQrCodeProps>()(props, [
      'defaultValue',
      'encoding',
      'id',
      'ids',
      'onValueChange',
      'value',
    ]),
  )

  const qrCode = useQrCode(reflect(() => useQrCodeProps))
  const mergedProps = $derived(mergeProps(qrCode().getRootProps(), localProps))

  QrCodeProvider(qrCode)
</script>

<Ark as="div" {...mergedProps} />
