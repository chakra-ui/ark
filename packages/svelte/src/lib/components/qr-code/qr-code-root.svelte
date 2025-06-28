<script module lang="ts">
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseQrCodeProps } from './use-qr-code.svelte'

  export interface QrCodeRootBaseProps extends Optional<UseQrCodeProps, 'id'>, PolymorphicProps<'div'>, RefAttribute {}
  export interface QrCodeRootProps extends Assign<HTMLProps<'div'>, QrCodeRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { QrCodeProvider } from './use-qr-code-context'
  import { useQrCode } from './use-qr-code.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: QrCodeRootProps = $props()
  const providedId = $props.id()

  const [useQrCodeProps, localProps] = $derived(
    createSplitProps<Optional<UseQrCodeProps, 'id'>>()(props, [
      'defaultValue',
      'encoding',
      'id',
      'ids',
      'onValueChange',
      'value',
      'pixelSize',
    ]),
  )

  const resolvedProps = $derived<UseQrCodeProps>({
    ...useQrCodeProps,
    id: providedId,
    value,
    onValueChange(details) {
      useQrCodeProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const qrCode = useQrCode(() => resolvedProps)
  const mergedProps = $derived(mergeProps(qrCode().getRootProps(), localProps))

  QrCodeProvider(qrCode)
</script>

<Ark as="div" bind:ref {...mergedProps} />
