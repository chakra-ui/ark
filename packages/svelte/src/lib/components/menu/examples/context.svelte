<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import styles from 'styles/menu.module.css'
</script>

<Menu.Root>
  <Menu.ContextTrigger class={styles.ContextTrigger}>Right click here</Menu.ContextTrigger>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      <Menu.Item class={styles.Item} value="cut">Cut</Menu.Item>
      <Menu.Item class={styles.Item} value="copy">Copy</Menu.Item>
      <Menu.Item class={styles.Item} value="paste">Paste</Menu.Item>
      <Menu.Separator class={styles.Separator} />
      <Menu.Item class={styles.Item} value="delete">Delete</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
