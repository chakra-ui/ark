<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  const items = [
    { value: 'profile', label: 'My Profile' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'logout', label: 'Log Out' },
  ]

  function handleSelect(e: { value: string }) {
    console.log('Selected:', e.value)
  }

  function handleItemSelect(label: string) {
    console.log('Item selected:', label)
  }
</script>

<Menu.Root onSelect={handleSelect}>
  <Menu.Trigger class={styles.Trigger}>
    Account
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      {#each items as item}
        <Menu.Item class={styles.Item} value={item.value} onSelect={() => handleItemSelect(item.label)}>
          {item.label}
        </Menu.Item>
      {/each}
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
