<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardContentProps extends Assign<HTMLProps<'div'>, HoverCardContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useHoverCardContext } from './use-hover-card-context'

  let { ref = $bindable<Element | null>(), ...props }: HoverCardContentProps = $props()

  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(hoverCard().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement | null) {
    presence().setNode(node)
    ref = node
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" {@attach setNode} {...mergedProps} />
{/if}
