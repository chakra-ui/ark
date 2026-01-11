<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'
</script>

<Menu.Root>
  <Menu.Trigger class={styles.Trigger}>
    File
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Item class={styles.Item} value="new">New File</Menu.Item>
        <Menu.Item class={styles.Item} value="open">Open...</Menu.Item>
        <Menu.Separator class={styles.Separator} />
        <Menu.Root>
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
        <Menu.Root>
          <Menu.TriggerItem class={styles.TriggerItem}>Export</Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content class={styles.Content}>
                <Menu.Item class={styles.Item} value="pdf">PDF</Menu.Item>
                <Menu.Item class={styles.Item} value="png">PNG</Menu.Item>
                <Menu.Item class={styles.Item} value="svg">SVG</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <Menu.Separator class={styles.Separator} />
        <Menu.Item class={styles.Item} value="print">Print...</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
