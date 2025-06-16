<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface HoverCardPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface HoverCardPositionerProps extends Assign<HTMLProps<'div'>, HoverCardPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useHoverCardContext } from './use-hover-card-context'

  const props: HoverCardPositionerProps = $props()

  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(hoverCard().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
