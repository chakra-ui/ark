<script module lang="ts">
  import type { Assign, HTMLProps } from '$lib/types'
  import type { UseQrCodeReturn } from './use-qr-code.svelte'

  interface RootProviderProps {
    value: UseQrCodeReturn
  }

  export interface QrCodeRootProviderBaseProps extends RootProviderProps {}
  export interface QrCodeRootProviderProps
    extends Assign<HTMLProps<'div'>, QrCodeRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { QrCodeProvider } from './use-qr-code-context'

  const props: QrCodeRootProviderProps = $props()

  const [{ value: qrCode }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = $derived(mergeProps(qrCode().getRootProps(), localProps))

  QrCodeProvider(qrCode)
</script>

<Ark as="div" {...mergedProps} />
