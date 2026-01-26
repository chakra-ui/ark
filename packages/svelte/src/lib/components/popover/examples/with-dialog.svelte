<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Popover } from '@ark-ui/svelte/popover'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import dialog from 'styles/dialog.module.css'
  import styles from 'styles/popover.module.css'
</script>

<Dialog.Root>
  <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class={dialog.Backdrop} />
    <Dialog.Positioner class={dialog.Positioner}>
      <Dialog.Content class={dialog.Content}>
        <Dialog.CloseTrigger class={dialog.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={dialog.Title}>Edit Profile</Dialog.Title>
        <Dialog.Description class={dialog.Description}>Update your profile information below.</Dialog.Description>
        <div class={dialog.Body}>
          <Popover.Root lazyMount unmountOnExit>
            <Popover.Trigger class={button.Root}>More Options</Popover.Trigger>
            <Portal>
              <Popover.Positioner class={styles.Positioner}>
                <Popover.Content class={styles.Content}>
                  <Popover.Arrow class={styles.Arrow}>
                    <Popover.ArrowTip class={styles.ArrowTip} />
                  </Popover.Arrow>
                  <Popover.CloseTrigger class={styles.CloseTrigger}>
                    <XIcon />
                  </Popover.CloseTrigger>
                  <Popover.Title class={styles.Title}>Additional Settings</Popover.Title>
                  <Popover.Description class={styles.Description}>
                    This popover renders correctly above the dialog.
                  </Popover.Description>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
