<script lang="ts">
  import { Combobox, createListCollection } from '@ark-ui/svelte/combobox'
  import { Field } from '@ark-ui/svelte/field'

  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })

  let props: Partial<Field.RootProps> = $props()
</script>

<Field.Root {...props}>
  <Combobox.Root {collection}>
    <Combobox.Label>Label</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Combobox.Positioner>
      <Combobox.Content>
        {#each collection.items as item (item.value)}
          <Combobox.Item {item}>
            <Combobox.ItemText>{item.label}</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>
