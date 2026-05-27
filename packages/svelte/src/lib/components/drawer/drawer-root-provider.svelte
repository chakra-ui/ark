<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from '../presence/index.ts'
  import type { UseDrawerReturn } from './use-drawer.svelte.ts'

  interface RootProviderProps {
    value: UseDrawerReturn
  }

  export interface DrawerRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
  export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '$lib/utils/render-strategy'
  import { PresenceProvider, usePresence } from '../presence/index.ts'
  import { splitPresenceProps } from '../presence/split-presence-props.svelte.ts'
  import { DrawerProvider } from './use-drawer-context.ts'

  let { value, children, ...props }: DrawerRootProviderProps = $props()

  const [presenceProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const presenceMachineProps = $derived.by(() => ({
    ...presenceProps,
    present: value().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DrawerProvider(() => value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
