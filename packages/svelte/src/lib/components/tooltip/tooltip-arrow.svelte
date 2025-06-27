<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TooltipArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TooltipArrowProps extends Assign<HTMLProps<'div'>, TooltipArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTooltipContext } from './use-tooltip-context'

  let { ref = $bindable(), ...props }: TooltipArrowProps = $props()
  const tooltip = useTooltipContext()
  const mergedProps = $derived(mergeProps(tooltip().getArrowProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
