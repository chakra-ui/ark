<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface ListboxItemContextProps {
    render: Snippet<[UseListboxItemContext]>
  }
</script>

<script lang="ts">
  import type { UseListboxItemContext } from './use-listbox-item-context.js'
  import { useListboxItemContext } from './use-listbox-item-context.js'

  let { render }: ListboxItemContextProps = $props()

  const context = useListboxItemContext()
</script>

{@render render(context)}
