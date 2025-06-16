<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSplitterContext } from './use-splitter-context'

  export interface SplitterContextProps {
    render: Snippet<[UseSplitterContext]>
  }
</script>

<script lang="ts">
  import { useSplitterContext } from './use-splitter-context'

  const { render }: SplitterContextProps = $props()

  const splitter = useSplitterContext()
</script>

{@render render(splitter)}
