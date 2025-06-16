<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface PopoverCloseTriggerProps extends Assign<HTMLProps<'button'>, PopoverCloseTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  const props: PopoverCloseTriggerProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getCloseTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
