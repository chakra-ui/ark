<script lang="ts">
  import { Combobox, createListCollection } from '@ark-ui/svelte/combobox'
  import { Portal } from '@ark-ui/svelte/portal'

  interface Item {
    label: string
    value: string
    disabled?: boolean | undefined
  }

  const collection = createListCollection<Item>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
  })

  let props: Partial<Combobox.RootProps<Item>> = $props()
</script>

<Combobox.Root {collection} {...props}>
  <Combobox.Label>Framework</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input />
    <Combobox.Trigger>Open</Combobox.Trigger>
    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner data-testid="positioner">
      <Combobox.Content>
        <Combobox.ItemGroup>
          <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
          {#each collection.items as item (item.value)}
            <Combobox.Item {item}>
              <Combobox.ItemText>{item.label}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          {/each}
        </Combobox.ItemGroup>
        <Combobox.List />
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
