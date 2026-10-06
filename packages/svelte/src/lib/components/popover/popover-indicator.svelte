<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface PopoverIndicatorProps extends Assign<HTMLProps<'span'>, PopoverIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePopoverContext } from './use-popover-context.ts'

  let { ref = $bindable(null), ...props }: PopoverIndicatorProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getIndicatorProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
