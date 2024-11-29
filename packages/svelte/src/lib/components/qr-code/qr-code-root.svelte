<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseQrCodeProps } from './use-qr-code.svelte'

  export interface QrCodeRootBaseProps extends UseQrCodeProps, PolymorphicProps<'div'> {}
  export interface QrCodeRootProps extends Assign<HTMLProps<'div'>, QrCodeRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { QrCodeProvider } from './use-qr-code-context'
  import { useQrCode } from './use-qr-code.svelte'

  const props: QrCodeRootProps = $props()
  const [useQrCodeProps, localProps] = createSplitProps<UseQrCodeProps>()(props, [
    'id',
    'ids',
    'value',
    'encoding',
  ])

  const qrCode = useQrCode(useQrCodeProps)
  const mergedProps = $derived(mergeProps(qrCode().getRootProps(), localProps))

  QrCodeProvider(qrCode)
</script>

<Ark as="div" {...mergedProps} />
