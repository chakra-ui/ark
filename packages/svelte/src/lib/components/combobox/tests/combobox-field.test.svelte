<script lang="ts">
  import { Combobox, createListCollection } from '@ark-ui/svelte/combobox'
  import { Field } from '@ark-ui/svelte/field'

  const collection = createListCollection({ items: ['React', 'Vue'] })
</script>

<Field.Root invalid>
  <Field.Label>Label</Field.Label>
  <Combobox.Root {collection}>
    <Combobox.Control>
      <Combobox.Input />
    </Combobox.Control>
  </Combobox.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
