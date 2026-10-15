<script lang="ts">
  import { Field } from '../../field/index.ts'
  import { Select, createListCollection } from '../index.ts'

  let { invalid = false }: { invalid?: boolean } = $props()
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
</script>

<Field.Root {invalid}>
  <Select.Root {collection}>
    <Select.Label>Label</Select.Label>
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
