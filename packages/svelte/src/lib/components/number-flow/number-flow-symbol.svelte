<script module lang="ts">
  import type { SymbolProps } from '@zag-js/number-flow'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberFlowSymbolBaseProps extends SymbolProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowSymbolProps extends HTMLProps<'span'>, NumberFlowSymbolBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  let { ref = $bindable(null), children, ...props }: NumberFlowSymbolProps = $props()
  const [symbolProps, localProps] = $derived(createSplitProps<SymbolProps>()(props, ['segment']))

  const numberFlow = useNumberFlowContext()
  const mergedProps = $derived(mergeProps(numberFlow().getSymbolProps(symbolProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {symbolProps.segment.value}
  {/if}
</Ark>
