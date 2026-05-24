<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePaginationContext } from './use-pagination-context.ts'

  export interface PaginationContextProps {
    render: Snippet<[UsePaginationContext]>
  }
</script>

<script lang="ts">
  import { usePaginationContext } from './use-pagination-context.ts'

  const { render }: PaginationContextProps = $props()
  const context = usePaginationContext()
</script>

{@render render(context)}
