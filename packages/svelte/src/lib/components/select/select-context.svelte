<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection'
  import type { UseSelectReturn } from './use-select.svelte'

  export interface SelectContextProps<T extends CollectionItem = CollectionItem> {
    render: Snippet<[UseSelectReturn<T>]>
  }
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { useSelectContext } from './use-select-context'

  const props: SelectContextProps<T> = $props()
  const select = useSelectContext()
</script>

{@render props.render(select)}
