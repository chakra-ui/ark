<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCollapsibleContext } from './use-collapsible-context'

  export interface CollapsibleContextProps {
    render?: Snippet<[UseCollapsibleContext]>
  }
</script>

<script lang="ts">
  import { useCollapsibleContext } from './use-collapsible-context'

  const { render }: CollapsibleContextProps = $props()

  const context = useCollapsibleContext()
</script>

{@render render?.(context)}
