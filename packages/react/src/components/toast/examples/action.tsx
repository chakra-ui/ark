import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  gap: 24,
})

export const Action = () => {
  return (
    <div>
      <button
        type="button"
        className={button.Root}
        onClick={() =>
          toaster.create({
            title: 'Event has been created',
            description: 'We have sent you an email with the event details.',
            type: 'info',
            action: {
              label: 'Undo',
              onClick: () => {
                console.log('Undo')
              },
            },
          })
        }
      >
        Create event
      </button>
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <Toast.Title className={styles.Title}>{toast.title}</Toast.Title>
              <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
              {toast.action && (
                <Toast.ActionTrigger className={styles.ActionTrigger}>{toast.action?.label}</Toast.ActionTrigger>
              )}
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
