<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardPositionerProps extends Assign<HTMLProps<'div'>, HoverCardPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useHoverCardContext } from './use-hover-card-context.ts'

  let { ref = $bindable(null), ...props }: HoverCardPositionerProps = $props()

  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(hoverCard().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
