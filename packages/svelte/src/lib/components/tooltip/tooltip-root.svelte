<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence/index.ts'
  import type { UseTooltipProps } from './use-tooltip.svelte.ts'

  export interface TooltipRootBaseProps extends Optional<UseTooltipProps, 'id'>, UsePresenceProps {}
  export interface TooltipRootProps extends TooltipRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider, usePresence } from '../presence/index.ts'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte.ts'
  import { TooltipProvider } from './use-tooltip-context.ts'
  import { useTooltip } from './use-tooltip.svelte.ts'
  import type { Optional } from '$lib/types'

  let { open = $bindable(), ...props }: TooltipRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const { children, ...useTooltipProps } = $derived(localProps)

  const resolvedProps = $derived<UseTooltipProps>({
    ...useTooltipProps,
    id: providedId,
    onOpenChange(details) {
      useTooltipProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
  })

  const tooltip = useTooltip(() => resolvedProps)
  const machineProps = $derived<UsePresenceProps>({
    ...presenceProps,
    present: tooltip().open,
  })

  const presence = usePresence(() => machineProps)

  TooltipProvider(tooltip)
  PresenceProvider(presence)
</script>

{@render children?.()}
