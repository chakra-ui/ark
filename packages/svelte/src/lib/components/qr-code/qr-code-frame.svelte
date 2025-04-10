<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface QrCodeFrameBaseProps extends PolymorphicProps<'svg'> {}
  export interface QrCodeFrameProps extends HTMLProps<'svg'>, QrCodeFrameBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useQrCodeContext } from './use-qr-code-context'

  const props: QrCodeFrameProps = $props()
  const qrCode = useQrCodeContext()
  const mergedProps = $derived(mergeProps(qrCode().getFrameProps(), props))
</script>

<Ark as="svg" {...mergedProps} />
