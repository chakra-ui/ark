<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'
  import tooltipStyles from 'styles/tooltip.module.css'
</script>

<Dialog.Root>
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet render(props)}
        <Dialog.Trigger {...props({ class: button.Root })}>Open Dialog</Dialog.Trigger>
      {/snippet}
    </Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content class={tooltipStyles.Content}>Opens a sign-in dialog</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Welcome Back</Dialog.Title>
        <Dialog.Description class={styles.Description}>Sign in to your account to continue.</Dialog.Description>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
