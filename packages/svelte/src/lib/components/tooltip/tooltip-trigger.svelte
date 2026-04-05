<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { TriggerProps } from '@zag-js/tooltip'

  export interface TooltipTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface TooltipTriggerProps extends Assign<HTMLProps<'button'>, TooltipTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { useTooltipContext } from './use-tooltip-context'

  let { ref = $bindable(null), ...props }: TooltipTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))
  const tooltip = useTooltipContext()
  const mergedProps = $derived(mergeProps(tooltip().getTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
