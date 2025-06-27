<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TooltipTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface TooltipTriggerProps extends Assign<HTMLProps<'button'>, TooltipTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTooltipContext } from './use-tooltip-context'

  let { ref = $bindable(null), ...props }: TooltipTriggerProps = $props()
  const tooltip = useTooltipContext()
  const mergedProps = $derived(mergeProps(tooltip().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
