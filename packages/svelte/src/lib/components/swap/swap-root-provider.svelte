<script module lang="ts">
  import type { Accessor, Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSwapReturn } from './use-swap.svelte.ts'

  export interface SwapRootProviderBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    value: Accessor<UseSwapReturn>
  }
  export interface SwapRootProviderProps extends Assign<HTMLProps<'span'>, SwapRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { SwapProvider } from './use-swap-context.ts'

  let { ref = $bindable(null), value, children, ...props }: SwapRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SwapProvider(() => value())
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {@render children?.()}
</Ark>
