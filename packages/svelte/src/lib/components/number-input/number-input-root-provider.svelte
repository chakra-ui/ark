<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseNumberInputReturn } from './use-number-input.svelte'

  export interface NumberInputRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseNumberInputReturn
  }
  export interface NumberInputRootProviderProps extends Assign<HTMLProps<'div'>, NumberInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { NumberInputProvider } from './use-number-input-context'

  let { ref = $bindable(null), value, ...props }: NumberInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  NumberInputProvider(value)
</script>

<Ark as="div" bind:ref {...mergedProps} />
