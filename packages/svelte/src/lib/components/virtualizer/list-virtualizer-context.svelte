<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseListVirtualizerContext } from './use-list-virtualizer-context.ts'

  export interface ListVirtualizerContextProps {
    render: Snippet<[UseListVirtualizerContext]>
  }
</script>

<script lang="ts">
  import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

  const { render }: ListVirtualizerContextProps = $props()

  const context = useListVirtualizerContext()
</script>

{@render render(context)}
