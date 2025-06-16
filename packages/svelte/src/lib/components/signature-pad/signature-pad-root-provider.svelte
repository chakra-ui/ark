<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseSignaturePadReturn } from './use-signature-pad.svelte'

  export interface SignaturePadRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseSignaturePadReturn
  }
  export interface SignaturePadRootProviderProps extends Assign<HTMLProps<'div'>, SignaturePadRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { SignaturePadProvider } from './use-signature-pad-context'

  let { value, ...props }: SignaturePadRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SignaturePadProvider(value)
</script>

<Ark as="div" {...mergedProps} />
