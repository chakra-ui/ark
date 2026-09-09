<script module lang="ts">
  import type { ContentState } from '@zag-js/collapsible'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CollapsibleContentState extends ContentState {}
  export interface CollapsibleContentBaseProps extends PolymorphicProps<'div', CollapsibleContentState>, RefAttribute {}
  export interface CollapsibleContentProps extends Assign<HTMLProps<'div'>, CollapsibleContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useCollapsibleContext } from './use-collapsible-context.ts'

  let { ref = $bindable(null), ...props }: CollapsibleContentProps = $props()

  const collapsible = useCollapsibleContext()
  const mergedProps = $derived(mergeProps(collapsible().getContentProps(), props))
</script>

{#if !collapsible().isUnmounted}
  <Ark as="div" bind:ref {...mergedProps} state={collapsible().getContentState()} />
{/if}
