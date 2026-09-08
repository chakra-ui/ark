import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithDialog = () => (
  <Dialog.Root>
    <Tooltip.Root>
      <Tooltip.Trigger render={<Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>} />
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content className={tooltipStyles.Content}>Opens a sign-in dialog</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
    <Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Positioner className={styles.Positioner}>
        <Dialog.Content className={styles.Content}>
          <Dialog.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={styles.Title}>Welcome Back</Dialog.Title>
          <Dialog.Description className={styles.Description}>Sign in to your account to continue.</Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
