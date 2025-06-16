<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TooltipPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface TooltipPositionerProps extends Assign<HTMLProps<'div'>, TooltipPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useTooltipContext } from './use-tooltip-context'

  const props: TooltipPositionerProps = $props()
  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(tooltip().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
