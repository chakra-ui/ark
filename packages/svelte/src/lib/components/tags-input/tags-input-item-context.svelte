<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTagsInputItemContext } from './use-tags-input-item-context.ts'

  export interface TagsInputItemContextProps {
    render: Snippet<[UseTagsInputItemContext]>
  }
</script>

<script lang="ts">
  import { useTagsInputItemContext } from './use-tags-input-item-context.ts'

  const props: TagsInputItemContextProps = $props()
  const item = useTagsInputItemContext()
</script>

{@render props.render(item)}
