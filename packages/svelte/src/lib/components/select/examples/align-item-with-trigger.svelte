<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from 'lucide-svelte'
  import styles from 'styles/select.module.css'

  const frameworks = createListCollection({
    items: [
      { label: 'Angular', value: 'angular' },
      { label: 'Ember', value: 'ember' },
      { label: 'Lit', value: 'lit' },
      { label: 'Preact', value: 'preact' },
      { label: 'Qwik', value: 'qwik' },
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Vue', value: 'vue' },
    ],
  })
</script>

<Select.Root alignItemWithTrigger class={styles.Root} collection={frameworks} defaultValue={['solid']}>
  <Select.Label class={styles.Label}>Framework</Select.Label>
  <Select.Control class={styles.Control}>
    <Select.Trigger class={styles.Trigger}>
      <Select.ValueText class={styles.ValueText} placeholder="Select" />
      <Select.Indicator class={styles.Indicator}>
        <ChevronsUpDownIcon />
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content class={styles.Content}>
        <Select.ScrollArrow class={styles.ScrollArrow} placement="top">
          <ChevronUpIcon />
        </Select.ScrollArrow>
        <Select.List class={styles.List}>
          {#each frameworks.items as item}
            <Select.Item class={styles.Item} {item}>
              <Select.ItemText class={styles.ItemText}>{item.label}</Select.ItemText>
              <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.List>
        <Select.ScrollArrow class={styles.ScrollArrow} placement="bottom">
          <ChevronDownIcon />
        </Select.ScrollArrow>
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>
