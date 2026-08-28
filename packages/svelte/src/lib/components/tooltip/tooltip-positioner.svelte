<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TooltipPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TooltipPositionerProps extends Assign<HTMLProps<'div'>, TooltipPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useTooltipContext } from './use-tooltip-context.ts'

  let { ref = $bindable(null), ...props }: TooltipPositionerProps = $props()
  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(tooltip().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
