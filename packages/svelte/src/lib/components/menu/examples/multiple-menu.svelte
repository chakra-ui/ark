<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  const fileItems = [
    { label: 'New File', value: 'new' },
    { label: 'Open...', value: 'open' },
    { label: 'Save', value: 'save' },
  ]

  const editItems = [
    { label: 'Undo', value: 'undo' },
    { label: 'Redo', value: 'redo' },
    { label: 'Cut', value: 'cut' },
    { label: 'Copy', value: 'copy' },
  ]
</script>

<div style:display="flex" style:gap="0.5rem">
  <Menu.Root id="file">
    <Menu.Trigger class={styles.Trigger}>
      File
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        {#each fileItems as item}
          <Menu.Item class={styles.Item} value={item.value}>{item.label}</Menu.Item>
        {/each}
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>

  <Menu.Root id="edit">
    <Menu.Trigger class={styles.Trigger}>
      Edit
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        {#each editItems as item}
          <Menu.Item class={styles.Item} value={item.value}>{item.label}</Menu.Item>
        {/each}
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</div>
