<script module lang="ts">
  import type { ContentState } from '@zag-js/hover-card'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardContentState extends ContentState {}
  export interface HoverCardContentBaseProps extends PolymorphicProps<'div', HoverCardContentState>, RefAttribute {}
  export interface HoverCardContentProps extends Assign<HTMLProps<'div'>, HoverCardContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useHoverCardContext } from './use-hover-card-context.ts'

  let { ref = $bindable(null), ...props }: HoverCardContentProps = $props()

  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(hoverCard().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {@attach setNode} {...mergedProps} state={hoverCard().getContentState()} />
{/if}
