<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection, useSelect } from '@ark-ui/svelte/select'
  import { ChevronDownIcon } from 'lucide-svelte'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  const id = $props.id()
  const select = useSelect({ collection, id })
</script>

<div>
  <button onclick={() => select().focus()}>Focus</button>

  <Select.RootProvider value={select}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <Select.Indicator>
          <ChevronDownIcon />
        </Select.Indicator>
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Portal>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
            {#each collection.items as item}
              <Select.Item {item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            {/each}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Portal>
    <Select.HiddenSelect />
  </Select.RootProvider>
</div>
