<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverPositionerProps extends Assign<HTMLProps<'div'>, PopoverPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { usePopoverContext } from './use-popover-context'

  let { ref = $bindable(), ...props }: PopoverPositionerProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(popover().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
