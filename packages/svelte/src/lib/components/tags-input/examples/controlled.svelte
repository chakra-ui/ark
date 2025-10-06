<script lang="ts">
  import { TagsInput } from '@ark-ui/svelte/tags-input'
  import { XIcon } from 'lucide-svelte'

  let value = $state<string[]>(['React', 'Svelte'])
</script>

<TagsInput.Root bind:value>
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

<div style="margin-top: 1rem;">
  <p>Current tags: {value.join(', ')}</p>
</div>
