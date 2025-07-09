<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface HoverCardTriggerProps extends Assign<HTMLProps<'button'>, HoverCardTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useHoverCardContext } from './use-hover-card-context'

  let { ref = $bindable(null), ...props }: HoverCardTriggerProps = $props()

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
