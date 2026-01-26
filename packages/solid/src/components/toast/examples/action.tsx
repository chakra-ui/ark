import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

export const Action = () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 16,
  })

  return (
    <div>
      <button
        type="button"
        class={button.Root}
        onClick={() =>
          toaster.create({
            title: 'Invitation sent',
            description: 'Your team invitation has been sent. Click undo to cancel.',
            type: 'info',
            action: {
              label: 'Undo',
              onClick: () => {
                console.log('Undo clicked')
              },
            },
          })
        }
      >
        Send invitation
      </button>
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root class={styles.Root}>
              <Toast.Title class={styles.Title}>{toast().title}</Toast.Title>
              <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
              {toast().action && (
                <Toast.ActionTrigger class={styles.ActionTrigger}>{toast().action?.label}</Toast.ActionTrigger>
              )}
              <Toast.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
