<script lang="ts" module>
  import type { UsePresenceProps } from '../presence/use-presence.svelte.js'
  import type { UseFloatingPanelReturn } from './use-floating-panel.svelte.js'

  interface RootProviderProps {
    value: UseFloatingPanelReturn
  }

  export interface FloatingPanelRootProviderBaseProps extends RootProviderProps, UsePresenceProps {
    children?: Snippet
  }
  export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import type { Snippet } from 'svelte'
  import { PresenceProvider, usePresence } from '../presence/index.js'
  import { FloatingPanelProvider } from './use-floating-panel-context.js'

  let { value, children, ...presenceProps }: FloatingPanelRootProviderProps = $props()
  const presence = usePresence(() => mergeProps({ present: value().open }, presenceProps))

  FloatingPanelProvider(value)
  PresenceProvider(presence)
</script>

{@render children?.()}
