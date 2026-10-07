<script module lang="ts">
  import type { Segment } from '@zag-js/number-flow'
  import type { Snippet } from 'svelte'

  export interface NumberFlowSegmentsProps {
    /**
     * Render each segment yourself. Defaults to a `Digit` for digit segments and a `Symbol` for the rest.
     */
    children?: Snippet<[Segment]>
  }
</script>

<script lang="ts">
  import NumberFlowDigit from './number-flow-digit.svelte'
  import NumberFlowSymbol from './number-flow-symbol.svelte'
  import { useNumberFlowContext } from './use-number-flow-context.ts'

  const { children }: NumberFlowSegmentsProps = $props()
  const numberFlow = useNumberFlowContext()
</script>

{#each numberFlow().segments as segment (segment.key)}
  {#if children}
    {@render children(segment)}
  {:else if segment.kind === 'digit'}
    <NumberFlowDigit {segment} />
  {:else}
    <NumberFlowSymbol {segment} />
  {/if}
{/each}
