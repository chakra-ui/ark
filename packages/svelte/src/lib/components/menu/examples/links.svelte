<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'
</script>

<Menu.Root>
  <Menu.Trigger class={styles.Trigger}>
    Help
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      <Menu.Item class={styles.Item} value="docs">
        {#snippet asChild(itemProps)}
          <a href="https://ark-ui.com" {...itemProps()}>Documentation</a>
        {/snippet}
      </Menu.Item>
      <Menu.Item class={styles.Item} value="github">
        {#snippet asChild(itemProps)}
          <a href="https://github.com/chakra-ui/ark" {...itemProps()}>GitHub</a>
        {/snippet}
      </Menu.Item>
      <Menu.Separator class={styles.Separator} />
      <Menu.Item class={styles.Item} value="changelog">
        {#snippet asChild(itemProps)}
          <a href="https://github.com/chakra-ui/ark/releases" {...itemProps()}>Changelog</a>
        {/snippet}
      </Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
