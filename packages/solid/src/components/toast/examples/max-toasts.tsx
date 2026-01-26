import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

export const MaxToasts = () => {
  const toaster = createToaster({
    max: 3,
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  return (
    <div>
      <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '8px' }}>
        <button
          type="button"
          class={button.Root}
          onClick={() =>
            toaster.create({
              title: 'New notification',
              description: 'Maximum of 3 toasts visible at once. Extra toasts are queued.',
              type: 'info',
            })
          }
        >
          Add toast
        </button>
        <button
          type="button"
          class={button.Root}
          onClick={() => {
            const messages = [
              { title: 'Message received', description: 'You have a new message from Sarah.' },
              { title: 'File uploaded', description: 'Your document has been saved.' },
              { title: 'Sync complete', description: 'All changes have been synced.' },
              { title: 'New follower', description: 'John started following you.' },
              { title: 'Task completed', description: 'Your export is ready for download.' },
            ]
            messages.forEach((msg) => {
              toaster.create({
                title: msg.title,
                description: msg.description,
                type: 'info',
              })
            })
          }}
        >
          Add 5 toasts
        </button>
      </div>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root class={styles.Root}>
              <Toast.Title class={styles.Title}>{toast().title}</Toast.Title>
              <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
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
