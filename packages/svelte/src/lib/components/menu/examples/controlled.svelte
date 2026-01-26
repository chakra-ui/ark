<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { ChevronDownIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/menu.module.css'

  let open = $state(false)
</script>

<div class="stack">
  <button type="button" class={button.Root} onclick={() => (open = !open)}>Toggle</button>
  <Menu.Root bind:open>
    <Menu.Trigger class={styles.Trigger}>
      Actions
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Item class={styles.Item} value="edit">Edit</Menu.Item>
        <Menu.Item class={styles.Item} value="duplicate">Duplicate</Menu.Item>
        <Menu.Item class={styles.Item} value="archive">Archive</Menu.Item>
        <Menu.Item class={styles.Item} value="delete">Delete</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</div>
