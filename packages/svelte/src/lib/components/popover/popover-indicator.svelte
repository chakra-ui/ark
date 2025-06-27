<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverIndicatorProps extends Assign<HTMLProps<'div'>, PopoverIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  let { ref = $bindable(), ...props }: PopoverIndicatorProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
