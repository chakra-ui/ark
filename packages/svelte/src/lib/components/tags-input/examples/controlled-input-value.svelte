<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'

  let inputValue = $state('')
</script>

<div>
  <div style="display: flex; gap: 8px; margin-bottom: 12px;">
    <button type="button" onclick={() => (inputValue = 'React')}>Set to "React"</button>
    <button type="button" onclick={() => (inputValue = '')}>Clear Input</button>
    <span style="font-size: 14px; margin-left: 8px;">Current input: "{inputValue}"</span>
  </div>

  <TagsInput.Root bind:inputValue>
    <TagsInput.Label>Frameworks</TagsInput.Label>
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
    <TagsInput.ClearTrigger><XIcon /></TagsInput.ClearTrigger>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</div>
