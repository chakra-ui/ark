<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseQrCodeReturn } from './use-qr-code.svelte'

  interface RootProviderProps {
    value: UseQrCodeReturn
  }

  export interface QrCodeRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface QrCodeRootProviderProps extends Assign<HTMLProps<'div'>, QrCodeRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { QrCodeProvider } from './use-qr-code-context'

  let { ref = $bindable(null), ...props }: QrCodeRootProviderProps = $props()
  const { value: qrCode, ...localProps } = props
  const mergedProps = $derived(mergeProps(qrCode().getRootProps(), localProps))

  QrCodeProvider(qrCode)
</script>

<Ark as="div" bind:ref {...mergedProps} />
