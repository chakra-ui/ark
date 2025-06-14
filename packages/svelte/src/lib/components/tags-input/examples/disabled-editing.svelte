<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'
</script>

<TagsInput.Root value={['React', 'Svelte', 'Vue']} editable={false}>
  <TagsInput.Label>Frameworks (Read-only)</TagsInput.Label>
  <TagsInput.Control>
    <TagsInput.Context>
      {#snippet render(tags)}
        {#each tags().value as value, index (index)}
          <TagsInput.Item {index} {value}>
            <TagsInput.ItemPreview>
              <TagsInput.ItemText>{value}</TagsInput.ItemText>
              <TagsInput.ItemDeleteTrigger><XIcon /></TagsInput.ItemDeleteTrigger>
            </TagsInput.ItemPreview>
            <TagsInput.ItemInput />
          </TagsInput.Item>
        {/each}
      {/snippet}
    </TagsInput.Context>
    <TagsInput.Input placeholder="Add Framework" />
  </TagsInput.Control>
  <TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger>
  <TagsInput.HiddenInput />
</TagsInput.Root>
