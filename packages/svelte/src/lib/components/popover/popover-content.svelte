<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverContentBaseProps extends PolymorphicProps<'div'> {
    ref?: Element | null
  }
  export interface PopoverContentProps extends Assign<HTMLProps<'div'>, PopoverContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { usePopoverContext } from './use-popover-context'

  let { ref = $bindable<Element | null>(), ...props }: PopoverContentProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(popover().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
    ref = node
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} {@attach setNode} />
{/if}
