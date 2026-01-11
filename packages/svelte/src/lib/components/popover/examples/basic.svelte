<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
  import { Portal } from '@ark-ui/svelte/portal'
  import button from 'styles/button.module.css'
  import styles from 'styles/popover.module.css'
</script>

<Popover.Root>
  <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
  <Portal>
    <Popover.Positioner class={styles.Positioner}>
      <Popover.Content class={styles.Content}>
        <Popover.Title class={styles.Title}>Favorite Frameworks</Popover.Title>
        <Popover.Description class={styles.Description}>
          Manage and organize your favorite web frameworks.
        </Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
