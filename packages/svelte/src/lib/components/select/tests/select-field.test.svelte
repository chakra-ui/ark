<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Select, createListCollection } from '@ark-ui/svelte/select'

  const collection = createListCollection({ items: ['React', 'Vue'] })
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Select.Root {collection}>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
      </Select.Trigger>
    </Select.Control>
    <Select.HiddenSelect />
  </Select.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
