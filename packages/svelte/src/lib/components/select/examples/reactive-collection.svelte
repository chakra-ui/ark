<script lang="ts">
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { CheckIcon, ChevronsUpDownIcon } from 'lucide-svelte'

  const itemsBase = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte', disabled: true },
    { label: 'Vue', value: 'vue' },
  ]

  let number = $state(0)

  const collection = $derived(
    createListCollection({
      items: itemsBase.map((item) => ({ ...item, label: `${item.label}-${number}` })),
    }),
  )
</script>

<div>
  <div style="margin-bottom: 1rem;">
    <button type="button" onclick={() => number++}>Inc</button>
    <button type="button" onclick={() => number--}>Dec</button>
    <span style="margin-left: 1rem;">Number: {number}</span>
  </div>

  <Select.Root positioning={{ sameWidth: true }} {collection}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select a Framework" />
        <ChevronsUpDownIcon />
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Framework</Select.ItemGroupLabel>
          {#each collection.items as item (item.label)}
            <Select.Item {item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
</div>
