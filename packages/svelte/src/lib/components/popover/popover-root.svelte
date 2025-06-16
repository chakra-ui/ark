<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence'
  import type { UsePopoverProps } from './use-popover.svelte'

  export interface PopoverRootBaseProps extends UsePopoverProps, UsePresenceProps {}
  export interface PopoverRootProps extends PopoverRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { PopoverProvider } from './use-popover-context'
  import { usePopover } from './use-popover.svelte'

  let { open = $bindable(), children, ...props }: PopoverRootProps = $props()

  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const machineProps = $derived.by<UsePopoverProps>(() => {
    return {
      ...localProps,
      id: localProps.id ?? providedId,
      open,
      onOpenChange(details) {
        localProps.onOpenChange?.(details)
        open = details.open
      },
    }
  })

  const popover = usePopover(() => machineProps)

  const presenceMachineProps = $derived.by<UsePresenceProps>(() => ({
    ...presenceProps,
    present: popover().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  PopoverProvider(popover)
  PresenceProvider(presence)
</script>

{@render children?.()}
