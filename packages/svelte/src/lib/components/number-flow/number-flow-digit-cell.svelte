<script module lang="ts">
  import type { DigitCellProps } from '@zag-js/number-flow'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberFlowDigitCellBaseProps extends DigitCellProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowDigitCellProps extends HTMLProps<'span'>, NumberFlowDigitCellBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  let { ref = $bindable(null), children, ...props }: NumberFlowDigitCellProps = $props()
  const [digitCellProps, localProps] = $derived(createSplitProps<DigitCellProps>()(props, ['cell', 'segment']))

  const numberFlow = useNumberFlowContext()
  const mergedProps = $derived(mergeProps(numberFlow().getDigitCellProps(digitCellProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {digitCellProps.cell.glyph}
  {/if}
</Ark>
