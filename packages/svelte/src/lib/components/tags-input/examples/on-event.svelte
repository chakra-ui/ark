<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'
</script>

<TagsInput.Root
  onValueChange={(details) => {
    console.log('tags changed to:', details.value)
  }}
  onHighlightChange={(details) => {
    console.log('highlighted tag:', details.highlightedValue)
  }}
  onValueInvalid={(details) => {
    console.log('Invalid!', details.reason)
  }}
  max={3}
  allowOverflow
  validate={(details) => {
    return !details.value.includes(details.inputValue)
  }}
>
  <TagsInput.Context>
    {#snippet render(tagsInput)}
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        {#each tagsInput().value as value, index (index)}
          <TagsInput.Item {index} {value}>
            <TagsInput.ItemPreview>
              <TagsInput.ItemText>{value}</TagsInput.ItemText>
              <TagsInput.ItemDeleteTrigger><XIcon /></TagsInput.ItemDeleteTrigger>
            </TagsInput.ItemPreview>
            <TagsInput.ItemInput />
          </TagsInput.Item>
        {/each}
      </TagsInput.Control>
      <TagsInput.Input placeholder="Add Framework" />
      <TagsInput.ClearTrigger><XIcon /></TagsInput.ClearTrigger>
    {/snippet}
  </TagsInput.Context>
  <TagsInput.HiddenInput />
</TagsInput.Root>
