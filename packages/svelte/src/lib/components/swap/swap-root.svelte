<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSwapProps } from './use-swap.svelte'

  export interface SwapRootBaseProps extends UseSwapProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface SwapRootProps extends Assign<HTMLProps<'span'>, SwapRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSwap } from './use-swap.svelte'
  import { SwapProvider } from './use-swap-context'

  let { ref = $bindable(null), children, swap: swapProp, lazyMount, unmountOnExit, ...props }: SwapRootProps = $props()

  const swap = useSwap(() => ({ swap: swapProp, lazyMount, unmountOnExit }))
  const mergedProps = $derived(mergeProps(swap().getRootProps(), props))

  SwapProvider(swap)
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {@render children?.()}
</Ark>
