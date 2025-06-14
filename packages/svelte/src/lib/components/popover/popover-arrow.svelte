<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverArrowBaseProps extends PolymorphicProps<'div'> {}
  export interface PopoverArrowProps extends Assign<HTMLProps<'div'>, PopoverArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  const props: PopoverArrowProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getArrowProps(), props))
</script>

<Ark as="div" {...mergedProps} />
