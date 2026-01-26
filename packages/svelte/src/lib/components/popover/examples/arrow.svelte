<script lang="ts">
  import { Popover } from '@ark-ui/svelte/popover'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/popover.module.css'
</script>

<Popover.Root>
  <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
  <Portal>
    <Popover.Positioner class={styles.Positioner}>
      <Popover.Content class={styles.Content}>
        <Popover.Arrow class={styles.Arrow}>
          <Popover.ArrowTip class={styles.ArrowTip} />
        </Popover.Arrow>
        <Popover.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Popover.CloseTrigger>
        <Popover.Title class={styles.Title}>Notifications</Popover.Title>
        <Popover.Description class={styles.Description}>You have 3 unread messages in your inbox.</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
