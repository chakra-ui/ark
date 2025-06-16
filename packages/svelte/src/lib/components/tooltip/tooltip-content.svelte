<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TooltipContentBaseProps extends PolymorphicProps<'div'> {
    ref?: Element | null
  }
  export interface TooltipContentProps extends Assign<HTMLProps<'div'>, TooltipContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useTooltipContext } from './use-tooltip-context'

  let { ref = $bindable<Element | null>(), ...props }: TooltipContentProps = $props()

  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(tooltip().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    ref = node
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} {@attach setNode} />
{/if}
