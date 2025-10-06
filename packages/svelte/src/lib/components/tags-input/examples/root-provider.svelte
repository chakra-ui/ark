<script lang="ts">
  import { TagsInput, useTagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'

  const id = $props.id()

  const tags = useTagsInput({
    id,
    defaultValue: ['React', 'Svelte'],
  })
</script>

<div>
  <button onclick={() => tags().addValue('Vue')}>Add Vue</button>
  <button onclick={() => tags().clearValue()}>Clear All</button>

  <TagsInput.RootProvider value={tags}>
    <TagsInput.Label>Frameworks</TagsInput.Label>
    <TagsInput.Control>
      {#each tags().value as value, index (index)}
        <TagsInput.Item {index} {value}>
          <TagsInput.ItemPreview>
            <TagsInput.ItemText>{value}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger><XIcon /></TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput />
        </TagsInput.Item>
      {/each}
      <TagsInput.Input placeholder="Add Framework" />
    </TagsInput.Control>
    <TagsInput.ClearTrigger><XIcon /></TagsInput.ClearTrigger>
    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>
</div>
