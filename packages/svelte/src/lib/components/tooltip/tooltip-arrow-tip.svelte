<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TooltipArrowTipBaseProps extends PolymorphicProps<'div'> {}
  export interface TooltipArrowTipProps extends Assign<HTMLProps<'div'>, TooltipArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTooltipContext } from './use-tooltip-context'

  const props: TooltipArrowTipProps = $props()
  const tooltip = useTooltipContext()
  const mergedProps = $derived(mergeProps(tooltip().getArrowTipProps(), props))
</script>

<Ark as="div" {...mergedProps} />
