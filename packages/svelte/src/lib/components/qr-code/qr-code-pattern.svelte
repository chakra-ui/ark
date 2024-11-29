<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface QrCodePatternBaseProps extends PolymorphicProps<'path'> {}
  export interface QrCodePatternProps extends HTMLProps<'path'>, QrCodePatternBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useQrCodeContext } from './use-qr-code-context'

  const props: QrCodePatternProps = $props()

  const qrCode = useQrCodeContext()
  const mergedProps = $derived(mergeProps(qrCode().getPatternProps(), props))
</script>

<Ark as="path" {...mergedProps} />
