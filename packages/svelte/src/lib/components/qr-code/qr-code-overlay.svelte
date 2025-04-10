<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface QrCodeOverlayBaseProps extends PolymorphicProps<'div'> {}
  export interface QrCodeOverlayProps extends HTMLProps<'div'>, QrCodeOverlayBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useQrCodeContext } from './use-qr-code-context'

  const props: QrCodeOverlayProps = $props()
  const qrCode = useQrCodeContext()
  const mergedProps = $derived(mergeProps(qrCode().getOverlayProps(), props))
</script>

<Ark as="div" {...mergedProps} />
