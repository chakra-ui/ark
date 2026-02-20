<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence'
  import type { UseDrawerProps } from './use-drawer.svelte'

  export interface DrawerRootBaseProps extends UseDrawerProps, UsePresenceProps {}
  export interface DrawerRootProps extends DrawerRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { DrawerProvider } from './use-drawer-context'
  import { useDrawer } from './use-drawer.svelte'

  let { open = $bindable(), children, ...props }: DrawerRootProps = $props()

  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const machineProps = $derived.by<UseDrawerProps>(() => {
    return {
      ...localProps,
      id: localProps.id ?? providedId,
      open,
      onOpenChange(details) {
        localProps.onOpenChange?.(details)
        if (open !== undefined) open = details.open
      },
    }
  })

  const drawer = useDrawer(() => machineProps)

  const presenceMachineProps = $derived.by<UsePresenceProps>(() => ({
    ...presenceProps,
    present: drawer().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DrawerProvider(drawer)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
