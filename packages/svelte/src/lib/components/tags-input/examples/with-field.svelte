<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { TagsInput } from '@ark-ui/svelte/tags-input'
</script>

<Field.Root>
  <TagsInput.Root>
    <TagsInput.Context>
      {#snippet render(tagsInput)}
        <TagsInput.Label>Label</TagsInput.Label>
        <TagsInput.Control>
          {#each tagsInput().value as value, index (index)}
            <TagsInput.Item {index} {value}>
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput />
            </TagsInput.Item>
          {/each}
        </TagsInput.Control>
        <TagsInput.Input placeholder="Add Framework" />
        <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
      {/snippet}
    </TagsInput.Context>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
