<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverAnchorBaseProps extends PolymorphicProps<'div'> {}
  export interface PopoverAnchorProps extends Assign<HTMLProps<'div'>, PopoverAnchorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePopoverContext } from './use-popover-context'

  const props: PopoverAnchorProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getAnchorProps(), props))
</script>

<Ark as="div" {...mergedProps} />
