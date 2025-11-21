<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection'

  export interface ListboxContextProps<T extends CollectionItem> {
    render: Snippet<[UseListboxContext<T>]>
  }
</script>

<script lang="ts" generics="T extends CollectionItem">
  import type { UseListboxContext } from './use-listbox-context.js'
  import { useListboxContext } from './use-listbox-context.js'

  let { render }: ListboxContextProps<T> = $props()

  const context = useListboxContext()
</script>

{@render render(context)}
