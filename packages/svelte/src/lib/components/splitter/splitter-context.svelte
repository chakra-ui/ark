<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSplitterContext } from './use-splitter-context.ts'

  export interface SplitterContextProps {
    render: Snippet<[UseSplitterContext]>
  }
</script>

<script lang="ts">
  import { useSplitterContext } from './use-splitter-context.ts'

  const { render }: SplitterContextProps = $props()

  const splitter = useSplitterContext()
</script>

{@render render(splitter)}
