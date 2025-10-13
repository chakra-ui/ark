<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'

  const DELIMITER_PATTERN = /[,;\s]/
</script>

<TagsInput.Root delimiter={DELIMITER_PATTERN}>
  <TagsInput.Label>Frameworks (separate with comma, semicolon, or space)</TagsInput.Label>
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
    <TagsInput.Input placeholder="Type and use comma, semicolon, or space" />
  </TagsInput.Control>
  <TagsInput.ClearTrigger><XIcon /></TagsInput.ClearTrigger>
  <TagsInput.HiddenInput />
</TagsInput.Root>
