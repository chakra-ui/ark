<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardArrowProps extends Assign<HTMLProps<'div'>, HoverCardArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useHoverCardContext } from './use-hover-card-context'

  let { ref = $bindable(null), ...props }: HoverCardArrowProps = $props()

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getArrowProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
