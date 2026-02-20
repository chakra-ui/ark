<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDrawerReturn } from './use-drawer.svelte'

  export interface DrawerRootProviderBaseProps {
    value: UseDrawerReturn
  }
  export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { PresenceProvider, usePresence } from '../presence'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte'
  import { DrawerProvider } from './use-drawer-context'

  let { value, children, ...props }: DrawerRootProviderProps = $props()

  const [presenceProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const presenceMachineProps = $derived.by(() => ({
    ...presenceProps,
    present: value().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DrawerProvider(value)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
