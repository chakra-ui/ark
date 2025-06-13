<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TooltipTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface TooltipTriggerProps extends Assign<HTMLProps<'button'>, TooltipTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTooltipContext } from './use-tooltip-context'

  const props: TooltipTriggerProps = $props()
  const tooltip = useTooltipContext()
  const mergedProps = $derived(mergeProps(tooltip().getTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
