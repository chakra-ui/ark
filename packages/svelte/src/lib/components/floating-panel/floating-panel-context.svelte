<script lang="ts" module>
  import type { Snippet } from 'svelte'
  import type { UseFloatingPanelContext } from './use-floating-panel-context.js'

  export interface FloatingPanelContextProps {
    render: Snippet<[UseFloatingPanelContext]>
  }
</script>

<script lang="ts">
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { render }: FloatingPanelContextProps = $props()

  const context = useFloatingPanelContext()
</script>

{@render render(context)}
