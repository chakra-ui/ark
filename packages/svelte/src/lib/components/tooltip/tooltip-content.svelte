<script module lang="ts">
  import type { ContentState } from '@zag-js/tooltip'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TooltipContentState extends ContentState {}
  export interface TooltipContentBaseProps extends PolymorphicProps<'div', TooltipContentState>, RefAttribute {}
  export interface TooltipContentProps extends Assign<HTMLProps<'div'>, TooltipContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useTooltipContext } from './use-tooltip-context.ts'

  let { ref = $bindable(null), ...props }: TooltipContentProps = $props()

  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(tooltip().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} state={tooltip().getContentState()} />
{/if}
