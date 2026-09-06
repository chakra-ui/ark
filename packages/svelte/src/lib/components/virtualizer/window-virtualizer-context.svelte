<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

  export interface WindowVirtualizerContextProps {
    render: Snippet<[UseWindowVirtualizerContext]>
  }
</script>

<script lang="ts">
  import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

  const { render }: WindowVirtualizerContextProps = $props()

  const context = useWindowVirtualizerContext()
</script>

{@render render(context)}
