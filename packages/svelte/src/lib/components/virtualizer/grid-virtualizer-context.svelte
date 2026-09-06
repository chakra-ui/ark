<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

  export interface GridVirtualizerContextProps {
    render: Snippet<[UseGridVirtualizerContext]>
  }
</script>

<script lang="ts">
  import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

  const { render }: GridVirtualizerContextProps = $props()

  const context = useGridVirtualizerContext()
</script>

{@render render(context)}
