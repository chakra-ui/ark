<script module lang="ts">
  import type { UsePresenceProps } from '../presence'
  import type { UseHoverCardReturn } from './use-hover-card.svelte'

  interface RootProviderProps {
    value: UseHoverCardReturn
  }

  export interface HoverCardRootProviderBaseProps extends RootProviderProps, UsePresenceProps {
    children?: Snippet
  }
  export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {}
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
  import { HoverCardProvider } from './use-hover-card-context'

  const { value, ...props }: HoverCardRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))

  HoverCardProvider(value)
  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
