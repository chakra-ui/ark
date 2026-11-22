<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection'
  import { Menu } from '@ark-ui/svelte/menu'
  import { CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  interface Item {
    value: string
    label: string
    group: string
    type?: 'checkbox' | 'radio'
  }

  const collection = createListCollection<Item>({
    items: [
      { value: 'new-file', label: 'New file', group: 'File' },
      { value: 'open-file', label: 'Open file', group: 'File' },
      { value: 'toolbar', label: 'Show toolbar', group: 'View', type: 'checkbox' },
      { value: 'status-bar', label: 'Show status bar', group: 'View', type: 'checkbox' },
      { value: 'name', label: 'Name', group: 'Sort by', type: 'radio' },
      { value: 'date', label: 'Date modified', group: 'Sort by', type: 'radio' },
    ],
    groupBy: (item) => item.group,
    groupSort: ['File', 'View', 'Sort by'],
  })

  let checked = $state(['toolbar'])
  let sortBy = $state('date')

  const toggle = (value: string, isChecked: boolean) => {
    checked = isChecked ? [...checked, value] : checked.filter((v) => v !== value)
  }
</script>

{#snippet renderItem(item: Item)}
  {#if item.type === 'checkbox'}
    <Menu.CheckboxItem
      class={styles.CheckboxItem}
      value={item.value}
      closeOnSelect={false}
      checked={checked.includes(item.value)}
      onCheckedChange={(isChecked) => toggle(item.value, isChecked)}
    >
      <Menu.ItemIndicator class={styles.ItemIndicator}>
        <CheckIcon />
      </Menu.ItemIndicator>
      <Menu.ItemText class={styles.ItemText}>{item.label}</Menu.ItemText>
    </Menu.CheckboxItem>
  {:else if item.type === 'radio'}
    <Menu.RadioItem class={styles.RadioItem} value={item.value}>
      <Menu.ItemIndicator class={styles.ItemIndicator}>
        <CheckIcon />
      </Menu.ItemIndicator>
      <Menu.ItemText class={styles.ItemText}>{item.label}</Menu.ItemText>
    </Menu.RadioItem>
  {:else}
    <Menu.Item class={styles.Item} value={item.value}>{item.label}</Menu.Item>
  {/if}
{/snippet}

<Menu.Root {collection}>
  <Menu.Trigger class={styles.Trigger}>
    File
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner class={styles.Positioner}>
    <Menu.Content class={styles.Content}>
      <Menu.List class={styles.List}>
        {#each collection.group() as [group, items] (group)}
          {#if items[0]?.type === 'radio'}
            <Menu.RadioItemGroup class={styles.ItemGroup} bind:value={sortBy}>
              <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
              {#each items as item (item.value)}
                {@render renderItem(item)}
              {/each}
            </Menu.RadioItemGroup>
          {:else}
            <Menu.ItemGroup class={styles.ItemGroup}>
              <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>{group}</Menu.ItemGroupLabel>
              {#each items as item (item.value)}
                {@render renderItem(item)}
              {/each}
            </Menu.ItemGroup>
          {/if}
        {/each}
      </Menu.List>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
