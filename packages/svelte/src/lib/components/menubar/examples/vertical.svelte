<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { Menubar } from '@ark-ui/svelte/menubar'
  import { Portal } from '@ark-ui/svelte/portal'
  import menu from 'styles/menu.module.css'
  import styles from 'styles/menubar.module.css'
</script>

<Menubar.Root class={styles.Root} orientation="vertical">
  <Menu.Root positioning={{ placement: 'right-start' }}>
    <Menu.Trigger class={styles.Trigger}>Account</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content class={menu.Content}>
          <Menu.Item class={menu.Item} value="profile">Profile</Menu.Item>
          <Menu.Item class={menu.Item} value="billing">Billing</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>

  <Menu.Root positioning={{ placement: 'right-start' }}>
    <Menu.Trigger class={styles.Trigger}>Workspace</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content class={menu.Content}>
          <Menu.Item class={menu.Item} value="members">Members</Menu.Item>
          <Menu.Item class={menu.Item} value="integrations">Integrations</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>

  <Menu.Root positioning={{ placement: 'right-start' }}>
    <Menu.Trigger class={styles.Trigger}>Help</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content class={menu.Content}>
          <Menu.Item class={menu.Item} value="docs">Documentation</Menu.Item>
          <Menu.Item class={menu.Item} value="support">Contact Support</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
</Menubar.Root>
