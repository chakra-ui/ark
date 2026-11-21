<script lang="ts">
  import { Select, createListCollection } from '@ark-ui/svelte/select'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  let props: Partial<Select.RootProps<string>> = $props()
</script>

<form data-testid="form">
  <Select.Root {collection} name="framework" {...props}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        {#each collection.items as item (item)}
          <Select.Item {item}>
            <Select.ItemText>{item}</Select.ItemText>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenInput />
  </Select.Root>
</form>
