<script lang="ts">
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import { ChevronDownIcon } from 'lucide-svelte'
  import styles from 'styles/menu.module.css'
  import tooltipStyles from 'styles/tooltip.module.css'
</script>

<Menu.Root>
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet render(props)}
        <Menu.Trigger {...props({ class: styles.Trigger })}>
          File
          <Menu.Indicator class={styles.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
      {/snippet}
    </Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content class={tooltipStyles.Content}>Open the file menu</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
  <Menu.Positioner>
    <Menu.Content class={styles.Content}>
      <Menu.Arrow class={styles.Arrow}>
        <Menu.ArrowTip class={styles.ArrowTip} />
      </Menu.Arrow>
      <Menu.Item class={styles.Item} value="new-file">New File</Menu.Item>
      <Menu.Item class={styles.Item} value="open">Open...</Menu.Item>
      <Menu.Item class={styles.Item} value="save">Save</Menu.Item>
      <Menu.Item class={styles.Item} value="save-as">Save As...</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
