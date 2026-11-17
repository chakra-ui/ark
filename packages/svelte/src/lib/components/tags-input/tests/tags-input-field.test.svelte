<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { TagsInput } from '@ark-ui/svelte/tags-input'
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <TagsInput.Root>
    <TagsInput.Control>
      <TagsInput.Input />
    </TagsInput.Control>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
