<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface PopoverTitleProps extends Assign<HTMLProps<'h2'>, PopoverTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  let { ref = $bindable(), ...props }: PopoverTitleProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
