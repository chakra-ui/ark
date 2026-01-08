<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'

  let sortBy = $state('date')
</script>

<Menu.Root>
  <Menu.Trigger class={styles.Trigger}>
    Sort
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      <Menu.RadioItemGroup class={styles.ItemGroup} bind:value={sortBy}>
        <Menu.ItemGroupLabel class={styles.ItemGroupLabel}>Sort By</Menu.ItemGroupLabel>
        <Menu.RadioItem class={styles.RadioItem} value="name">
          <Menu.ItemIndicator class={styles.ItemIndicator}>
            <CheckIcon />
          </Menu.ItemIndicator>
          <Menu.ItemText class={styles.ItemText}>Name</Menu.ItemText>
        </Menu.RadioItem>
        <Menu.RadioItem class={styles.RadioItem} value="date">
          <Menu.ItemIndicator class={styles.ItemIndicator}>
            <CheckIcon />
          </Menu.ItemIndicator>
          <Menu.ItemText class={styles.ItemText}>Date Modified</Menu.ItemText>
        </Menu.RadioItem>
        <Menu.RadioItem class={styles.RadioItem} value="size">
          <Menu.ItemIndicator class={styles.ItemIndicator}>
            <CheckIcon />
          </Menu.ItemIndicator>
          <Menu.ItemText class={styles.ItemText}>Size</Menu.ItemText>
        </Menu.RadioItem>
        <Menu.RadioItem class={styles.RadioItem} value="type">
          <Menu.ItemIndicator class={styles.ItemIndicator}>
            <CheckIcon />
          </Menu.ItemIndicator>
          <Menu.ItemText class={styles.ItemText}>Type</Menu.ItemText>
        </Menu.RadioItem>
      </Menu.RadioItemGroup>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
