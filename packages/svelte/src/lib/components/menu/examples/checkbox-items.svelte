<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  let showToolbar = $state(true)
  let showStatusBar = $state(false)
</script>

<Menu.Root>
  <Menu.Trigger class={styles.Trigger}>
    View
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      <Menu.CheckboxItem class={styles.CheckboxItem} bind:checked={showToolbar} value="toolbar">
        <Menu.ItemIndicator class={styles.ItemIndicator}>
          <CheckIcon />
        </Menu.ItemIndicator>
        <Menu.ItemText class={styles.ItemText}>Show Toolbar</Menu.ItemText>
      </Menu.CheckboxItem>
      <Menu.CheckboxItem class={styles.CheckboxItem} bind:checked={showStatusBar} value="status-bar">
        <Menu.ItemIndicator class={styles.ItemIndicator}>
          <CheckIcon />
        </Menu.ItemIndicator>
        <Menu.ItemText class={styles.ItemText}>Show Status Bar</Menu.ItemText>
      </Menu.CheckboxItem>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
