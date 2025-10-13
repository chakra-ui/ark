<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'
</script>

<TagsInput.Root maxLength={10}>
  <TagsInput.Label>Frameworks (max 10 characters per tag)</TagsInput.Label>
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
    <TagsInput.Input placeholder="Max 10 characters" />
  </TagsInput.Control>
  <TagsInput.ClearTrigger><XIcon /></TagsInput.ClearTrigger>
  <TagsInput.HiddenInput />
</TagsInput.Root>
