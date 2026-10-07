<script module lang="ts">
  import type { DigitTrackProps } from '@zag-js/number-flow'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberFlowDigitTrackBaseProps extends DigitTrackProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowDigitTrackProps extends HTMLProps<'span'>, NumberFlowDigitTrackBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import NumberFlowDigitCell from './number-flow-digit-cell.svelte'
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  let { ref = $bindable(null), children, ...props }: NumberFlowDigitTrackProps = $props()
  const [digitTrackProps, localProps] = $derived(createSplitProps<DigitTrackProps>()(props, ['segment']))

  const numberFlow = useNumberFlowContext()
  const mergedProps = $derived(mergeProps(numberFlow().getDigitTrackProps(digitTrackProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {#each numberFlow().digitCells as cell (cell.index)}
      <NumberFlowDigitCell segment={digitTrackProps.segment} {cell} />
    {/each}
  {/if}
</Ark>
