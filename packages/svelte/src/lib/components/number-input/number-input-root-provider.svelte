<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseNumberInputReturn } from './use-number-input.svelte.ts'

  export interface NumberInputRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseNumberInputReturn
  }
  export interface NumberInputRootProviderProps extends Assign<HTMLProps<'div'>, NumberInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { NumberInputProvider } from './use-number-input-context.ts'

  let { ref = $bindable(null), value, ...props }: NumberInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  NumberInputProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
