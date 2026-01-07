<script lang="ts">
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { CheckIcon, ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'
  import button from 'styles/button.module.css'

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
  <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; align-items: center;">
    <button class={button.Root} type="button" onclick={() => number++}>Inc</button>
    <button class={button.Root} type="button" onclick={() => number--}>Dec</button>
    <span style="margin-left: 1rem;">Number: {number}</span>
  </div>

  <Select.Root class={styles.Root} positioning={{ sameWidth: true }} {collection}>
    <Select.Label class={styles.Label}>Framework</Select.Label>
    <Select.Control class={styles.Control}>
      <Select.Trigger class={styles.Trigger}>
        <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
        <Select.Indicator class={styles.Indicator}>
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content class={styles.Content}>
        <Select.ItemGroup class={styles.ItemGroup}>
          <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Framework</Select.ItemGroupLabel>
          {#each collection.items as item (item.label)}
            <Select.Item class={styles.Item} {item}>
              <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
              <Select.ItemIndicator class={styles.ItemIndicator}>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
</div>
