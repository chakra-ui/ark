<script lang="ts">
  import { Menu, useMenu } from '@ark-ui/svelte/menu'
  import { ChevronDownIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/menu.module.css'

  const menu = useMenu()
</script>

<div class="stack">
  <button class={button.Root} onclick={() => menu().api.setHighlightedValue('copy')}>Highlight Copy</button>
  <Menu.RootProvider value={menu}>
    <Menu.Trigger class={styles.Trigger}>
      Edit
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Item class={styles.Item} value="cut">Cut</Menu.Item>
        <Menu.Item class={styles.Item} value="copy">Copy</Menu.Item>
        <Menu.Item class={styles.Item} value="paste">Paste</Menu.Item>
        <Menu.Item class={styles.Item} value="delete">Delete</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.RootProvider>
</div>
