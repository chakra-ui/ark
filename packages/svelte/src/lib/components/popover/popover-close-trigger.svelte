<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PopoverCloseTriggerProps extends Assign<HTMLProps<'button'>, PopoverCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePopoverContext } from './use-popover-context.ts'

  let { ref = $bindable(null), ...props }: PopoverCloseTriggerProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
