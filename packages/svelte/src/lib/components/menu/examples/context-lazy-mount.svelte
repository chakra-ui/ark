<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/menu.module.css'
</script>

<Menu.Root lazyMount unmountOnExit>
  <Menu.ContextTrigger class={styles.ContextTrigger}>Right click here</Menu.ContextTrigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Item class={styles.Item} value="cut">Cut</Menu.Item>
        <Menu.Item class={styles.Item} value="copy">Copy</Menu.Item>
        <Menu.Item class={styles.Item} value="paste">Paste</Menu.Item>
        <Menu.Separator class={styles.Separator} />
        <Menu.Root lazyMount unmountOnExit>
          <Menu.TriggerItem class={styles.TriggerItem}>Share</Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content class={styles.Content}>
                <Menu.Item class={styles.Item} value="email">Email</Menu.Item>
                <Menu.Item class={styles.Item} value="message">Message</Menu.Item>
                <Menu.Item class={styles.Item} value="airdrop">AirDrop</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
