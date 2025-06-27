<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardArrowTipBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardArrowTipProps extends Assign<HTMLProps<'div'>, HoverCardArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useHoverCardContext } from './use-hover-card-context'

  let { ref = $bindable(), ...props }: HoverCardArrowTipProps = $props()

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getArrowTipProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
