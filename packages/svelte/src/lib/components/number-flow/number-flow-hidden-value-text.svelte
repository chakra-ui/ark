<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberFlowHiddenValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface NumberFlowHiddenValueTextProps extends HTMLProps<'span'>, NumberFlowHiddenValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  let { ref = $bindable(null), children, ...props }: NumberFlowHiddenValueTextProps = $props()

  const numberFlow = useNumberFlowContext()
  const mergedProps = $derived(mergeProps(numberFlow().getValueTextProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {numberFlow().announcedValueText}
  {/if}
</Ark>
