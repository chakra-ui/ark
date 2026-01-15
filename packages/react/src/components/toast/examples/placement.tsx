import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'top-end',
  overlap: true,
  gap: 16,
})

export const Placement = () => {
  return (
    <div>
      <button
        type="button"
        className={button.Root}
        onClick={() =>
          toaster.create({
            title: 'Notification',
            description: 'This toast appears at the top-right corner.',
            type: 'info',
          })
        }
      >
        Show toast (top-end)
      </button>
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <Toast.Title className={styles.Title}>{toast.title}</Toast.Title>
              <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
              <Toast.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
