<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverDescriptionBaseProps extends PolymorphicProps<'p'>, RefAttribute {}
  export interface PopoverDescriptionProps extends Assign<HTMLProps<'p'>, PopoverDescriptionBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  let { ref = $bindable(), ...props }: PopoverDescriptionProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getDescriptionProps(), props))
</script>

<Ark as="p" bind:ref {...mergedProps} />
