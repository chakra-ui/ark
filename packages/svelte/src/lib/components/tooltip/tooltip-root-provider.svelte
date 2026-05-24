<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence/index.ts'
  import type { UseTooltipReturn } from './use-tooltip.svelte.ts'

  interface RootProviderProps {
    value: UseTooltipReturn
  }

  export interface TooltipRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
  export interface TooltipRootProviderProps extends TooltipRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider, usePresence } from '../presence/index.ts'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte.ts'
  import { TooltipProvider } from './use-tooltip-context.ts'

  const props: TooltipRootProviderProps = $props()

  const [presenceProps, rootProviderProps] = $derived(splitPresenceProps(props))

  const machineProps = $derived.by<UsePresenceProps>(() => ({
    ...presenceProps,
    present: rootProviderProps.value().open,
  }))

  const presence = usePresence(() => machineProps)

  TooltipProvider(() => rootProviderProps.value())
  PresenceProvider(presence)
</script>

{@render props.children?.()}
