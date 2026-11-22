<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { Tabs } from '@ark-ui/svelte/tabs'
  import { CheckIcon, ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'
  import tabs from 'styles/tabs.module.css'

  const refs: Record<string, string[]> = {
    branches: ['main', 'develop', 'feat/date-input', 'feat/listbox-grid', 'fix/menu-focus'],
    tags: ['v6.0.0', 'v5.36.1', 'v5.36.0', 'v5.35.2', 'v5.35.1'],
  }

  let tab = $state('branches')
  let value = $state(['main'])

  const collection = $derived(createListCollection({ items: refs[tab] }))
</script>

<Select.Root class={styles.Root} {collection} bind:value>
  <Select.Label class={styles.Label}>Switch branches or tags</Select.Label>
  <Select.Control class={styles.Control}>
    <Select.Trigger class={styles.Trigger}>
      <Select.ValueText class={styles.ValueText}>{value[0]}</Select.ValueText>
      <Select.Indicator class={styles.Indicator}>
        <ChevronsUpDownIcon />
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
  <Portal>
    <Select.Positioner class={styles.Positioner}>
      <Select.Content class={styles.Content}>
        <Tabs.Root
          class={tabs.Root}
          value={tab}
          onValueChange={(details) => {
            if (details.value) tab = details.value
          }}
          lazyMount
          unmountOnExit
        >
          <Tabs.List class={tabs.List}>
            <Tabs.Trigger class={tabs.Trigger} value="branches">Branches</Tabs.Trigger>
            <Tabs.Trigger class={tabs.Trigger} value="tags">Tags</Tabs.Trigger>
          </Tabs.List>
          {#each Object.keys(refs) as key (key)}
            <Tabs.Content value={key} class={tabs.Content}>
              <Select.List class={styles.List}>
                {#each collection.items as item (item)}
                  <Select.Item class={styles.Item} {item}>
                    <Select.ItemText class={styles.ItemText}>{item}</Select.ItemText>
                    <Select.ItemIndicator class={styles.ItemIndicator}>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                {/each}
              </Select.List>
            </Tabs.Content>
          {/each}
        </Tabs.Root>
      </Select.Content>
    </Select.Positioner>
  </Portal>
</Select.Root>
