<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTagsInputItemContext } from './use-tags-input-item-context'

  export interface TagsInputItemContextProps {
    render: Snippet<[UseTagsInputItemContext]>
  }
</script>

<script lang="ts">
  import { useTagsInputItemContext } from './use-tags-input-item-context'

  const props: TagsInputItemContextProps = $props()
  const item = useTagsInputItemContext()
</script>

{@render props.render(item)}
