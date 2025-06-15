<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseNumberInputReturn } from './use-number-input.svelte'

  export interface NumberInputRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseNumberInputReturn
  }
  export interface NumberInputRootProviderProps extends Assign<HTMLProps<'div'>, NumberInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { NumberInputProvider } from './use-number-input-context'

  let { value, ...props }: NumberInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  NumberInputProvider(value)
</script>

<Ark as="div" {...mergedProps} />
