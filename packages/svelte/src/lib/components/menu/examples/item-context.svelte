<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'
</script>

<Menu.Root>
  <Menu.Trigger class={styles.Trigger}>
    Settings
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      <Menu.Item class={styles.Item} value="profile">
        <Menu.ItemContext>
          {#snippet render(item)}
            <span style:font-weight={item().highlighted ? 600 : 400}>Profile Settings</span>
          {/snippet}
        </Menu.ItemContext>
      </Menu.Item>
      <Menu.Item class={styles.Item} value="preferences">Preferences</Menu.Item>
      <Menu.Item class={styles.Item} value="notifications">Notifications</Menu.Item>
      <Menu.Separator class={styles.Separator} />
      <Menu.Item class={styles.Item} value="logout">Log Out</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
