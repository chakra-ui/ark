<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { DownloadTriggerProps } from '@zag-js/qr-code'

  export interface QrCodeDownloadTriggerBaseProps
    extends DownloadTriggerProps,
      PolymorphicProps<'button'>,
      RefAttribute {}

  export interface QrCodeDownloadTriggerProps extends HTMLProps<'button'>, QrCodeDownloadTriggerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { useQrCodeContext } from './use-qr-code-context'

  let { ref = $bindable(null), ...props }: QrCodeDownloadTriggerProps = $props()
  const [downloadTriggerProps, localProps] = $derived(
    createSplitProps<DownloadTriggerProps>()(props, ['fileName', 'mimeType', 'quality']),
  )
  const qrCode = useQrCodeContext()
  const mergedProps = $derived(mergeProps(qrCode().getDownloadTriggerProps(downloadTriggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
