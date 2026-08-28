<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface QrCodeFrameBaseProps extends PolymorphicProps<'svg'>, RefAttribute {}
  export interface QrCodeFrameProps extends HTMLProps<'svg'>, QrCodeFrameBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useQrCodeContext } from './use-qr-code-context.ts'

  let { ref = $bindable(null), ...props }: QrCodeFrameProps = $props()
  const qrCode = useQrCodeContext()
  const mergedProps = $derived(mergeProps(qrCode().getFrameProps(), props))
</script>

<Ark as="svg" bind:ref {...mergedProps} />
