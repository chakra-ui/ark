<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface HoverCardArrowTipBaseProps extends PolymorphicProps<'div'> {}
  export interface HoverCardArrowTipProps extends Assign<HTMLProps<'div'>, HoverCardArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useHoverCardContext } from './use-hover-card-context'

  const props: HoverCardArrowTipProps = $props()

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getArrowTipProps(), props))
</script>

<Ark as="div" {...mergedProps} />
