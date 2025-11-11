<script lang="ts">
  import { TagsInput, useTagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'

  const tags = useTagsInput()
</script>

<div>
  <div style="display: flex; gap: 8px; margin-bottom: 12px;">
    <button type="button" onclick={() => tags().addValue('React')}>Add React</button>
    <button type="button" onclick={() => tags().addValue('Solid')}>Add Solid</button>
    <button type="button" onclick={() => tags().setValue(['Vue', 'Svelte'])}>Set to Vue & Svelte</button>
    <button type="button" onclick={() => tags().clearValue()}>Clear All</button>
  </div>

  <TagsInput.RootProvider value={tags}>
    <TagsInput.Label>Frameworks (Programmatic Control)</TagsInput.Label>
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
