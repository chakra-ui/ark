<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection, useSelect } from '@ark-ui/svelte/select'
  import { ChevronsUpDownIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/select.module.css'

  const frameworks = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })

  const id = $props.id()
  const select = useSelect({ collection: frameworks, id })
</script>

<div>
  <button class={button.Root} style="margin-bottom: 1rem;" onclick={() => select().focus()}>Focus</button>

  <Select.RootProvider class={styles.Root} value={select}>
    <Select.Label class={styles.Label}>Framework</Select.Label>
    <Select.Control class={styles.Control}>
      <Select.Trigger class={styles.Trigger}>
        <Select.ValueText class={styles.ValueText} placeholder="Select a Framework" />
      </Select.Trigger>
      <div class={styles.Indicators}>
        <Select.ClearTrigger class={styles.ClearTrigger}>
          <XIcon />
        </Select.ClearTrigger>
        <Select.Indicator class={styles.Indicator}>
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </div>
    </Select.Control>
    <Portal>
      <Select.Positioner>
        <Select.Content class={styles.Content}>
          <Select.ItemGroup class={styles.ItemGroup}>
            <Select.ItemGroupLabel class={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
            {#each frameworks.items as item}
              <Select.Item class={styles.Item} {item}>
                <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
                <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
              </Select.Item>
            {/each}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Portal>
    <Select.HiddenSelect />
  </Select.RootProvider>
</div>
