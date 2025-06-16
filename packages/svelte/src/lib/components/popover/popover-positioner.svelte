<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PopoverPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface PopoverPositionerProps extends Assign<HTMLProps<'div'>, PopoverPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { usePopoverContext } from './use-popover-context'

  const props: PopoverPositionerProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(popover().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
