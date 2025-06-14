<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverArrowTipBaseProps extends PolymorphicProps<'div'> {}
  export interface PopoverArrowTipProps extends Assign<HTMLProps<'div'>, PopoverArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  const props: PopoverArrowTipProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getArrowTipProps(), props))
</script>

<Ark as="div" {...mergedProps} />
