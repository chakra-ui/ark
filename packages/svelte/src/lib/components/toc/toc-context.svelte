<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTocContext } from './use-toc-context.ts'

  export interface TocContextProps {
    render: Snippet<[UseTocContext]>
  }
</script>

<script lang="ts">
  import { useTocContext } from './use-toc-context.ts'

  const { render }: TocContextProps = $props()

  const toc = useTocContext()
</script>

{@render render(toc)}
