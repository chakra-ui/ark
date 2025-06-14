<script lang="ts">
  import { Field, type FieldRootProps } from '@ark-ui/svelte/field'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronDownIcon } from 'lucide-svelte'

  const props: FieldRootProps = $props()

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
</script>

<Field.Root {...props}>
  <Select.Root {collection}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <Select.Indicator>
          <ChevronDownIcon />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        {#each collection.items as item}
          <Select.Item {item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator>✓</Select.ItemIndicator>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
