<script module lang="ts">
  import type { DigitProps } from '@zag-js/number-flow'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberFlowDigitBaseProps extends DigitProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowDigitProps extends HTMLProps<'span'>, NumberFlowDigitBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import NumberFlowDigitTrack from './number-flow-digit-track.svelte'
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  let { ref = $bindable(null), children, ...props }: NumberFlowDigitProps = $props()
  const [digitProps, localProps] = $derived(createSplitProps<DigitProps>()(props, ['segment']))

  const numberFlow = useNumberFlowContext()
  const mergedProps = $derived(mergeProps(numberFlow().getDigitProps(digitProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    <NumberFlowDigitTrack segment={digitProps.segment} />
  {/if}
</Ark>
