<script module lang="ts">
  import type { UsePresenceProps } from '../presence/index.ts'
  import type { UseHoverCardProps } from './use-hover-card.svelte.ts'

  export interface HoverCardRootBaseProps extends UseHoverCardProps, UsePresenceProps {
    children?: Snippet
  }
  export interface HoverCardRootProps extends HoverCardRootBaseProps {}
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.ts'
  import { HoverCardProvider } from './use-hover-card-context.ts'
  import { useHoverCard } from './use-hover-card.svelte.ts'

  let { open = $bindable<boolean>(), ...props }: HoverCardRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const resolvedProps = $derived<UseHoverCardProps>({
    ...localProps,
    id: localProps.id ?? providedId,
    open,
    onOpenChange(details) {
      localProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
  })

  const hoverCard = useHoverCard(() => resolvedProps)
  const presence = usePresence(() => ({ present: hoverCard().open, ...presenceProps }))

  HoverCardProvider(hoverCard)
  PresenceProvider(presence)
</script>

{@render props.children?.()}
