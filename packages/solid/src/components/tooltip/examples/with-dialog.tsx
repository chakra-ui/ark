import { Dialog } from '@ark-ui/solid/dialog'
import { Tooltip } from '@ark-ui/solid/tooltip'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithDialog = () => (
  <Dialog.Root>
    <Tooltip.Root>
      <Tooltip.Trigger render={(props) => <Dialog.Trigger {...props} class={button.Root} />}>
        Open Dialog
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
)
