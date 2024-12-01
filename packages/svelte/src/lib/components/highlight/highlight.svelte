<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import type { HTMLProps, Assign } from '$lib/types'
  import { useHighlight, type UseHighlightProps } from './use-highlight.svelte'

  export interface HighlightBaseProps extends UseHighlightProps {}
  export interface HighlightProps extends Assign<HTMLProps<'mark'>, HighlightBaseProps> {}

  const props: HighlightProps = $props()

  const [highlightProps, localProps] = createSplitProps<HighlightBaseProps>()(props, [
    'query',
    'text',
    'ignoreCase',
    'matchAll',
  ])

  if (typeof highlightProps.text !== 'string') {
    throw new Error('[ark-ui/highlight] text must be a string')
  }

  const chunks = useHighlight(highlightProps)
</script>

{#each chunks as { text, match }, i}
  {#if match}
    <mark {...localProps}>{text}</mark>
  {:else}
    {text}
  {/if}
{/each} 
