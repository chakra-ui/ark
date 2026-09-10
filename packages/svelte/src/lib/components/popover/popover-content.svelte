<script module lang="ts">
  import type { ContentState } from '@zag-js/popover'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverContentState extends ContentState {}
  export interface PopoverContentBaseProps extends PolymorphicProps<'div', PopoverContentState>, RefAttribute {}
  export interface PopoverContentProps extends Assign<HTMLProps<'div'>, PopoverContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { usePopoverContext } from './use-popover-context.ts'

  let { ref = $bindable(null), ...props }: PopoverContentProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(popover().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} state={popover().getContentState()} />
{/if}
