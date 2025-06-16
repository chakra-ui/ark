<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseHoverCardContext } from './use-hover-card-context'

  export interface HoverCardContextProps {
    render: Snippet<[UseHoverCardContext]>
  }
</script>

<script lang="ts">
  import { useHoverCardContext } from './use-hover-card-context'

  const { render }: HoverCardContextProps = $props()
  const context = useHoverCardContext()
</script>

{@render render(context)}
