<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { Menubar } from '@ark-ui/svelte/menubar'
  import { Portal } from '@ark-ui/svelte/portal'
  import menu from 'styles/menu.module.css'
  import styles from 'styles/menubar.module.css'
</script>

<Menubar.Root class={styles.Root} disabled>
  <Menu.Root>
    <Menu.Trigger class={styles.Trigger}>File</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content class={menu.Content}>
          <Menu.Item class={menu.Item} value="new">New File</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>

  <Menu.Root>
    <Menu.Trigger class={styles.Trigger}>Edit</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content class={menu.Content}>
          <Menu.Item class={menu.Item} value="undo">Undo</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
</Menubar.Root>
