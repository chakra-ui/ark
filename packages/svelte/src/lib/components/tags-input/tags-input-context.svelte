<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTagsInputReturn } from './use-tags-input.svelte'

  export interface TagsInputContextProps {
    render: Snippet<[UseTagsInputReturn]>
  }
</script>

<script lang="ts">
  import { useTagsInputContext } from './use-tags-input-context'

  const props: TagsInputContextProps = $props()
  const tagsInput = useTagsInputContext()
</script>

{@render props.render(tagsInput)}
