<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTagsInputReturn } from './use-tags-input.svelte.ts'

  export interface TagsInputContextProps {
    render: Snippet<[UseTagsInputReturn]>
  }
</script>

<script lang="ts">
  import { useTagsInputContext } from './use-tags-input-context.ts'

  const props: TagsInputContextProps = $props()
  const tagsInput = useTagsInputContext()
</script>

{@render props.render(tagsInput)}
