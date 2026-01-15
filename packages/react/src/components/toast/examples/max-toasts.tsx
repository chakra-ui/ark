import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon, InfoIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  max: 3,
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

export const MaxToasts = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button
          type="button"
          className={button.Root}
          onClick={() =>
            toaster.create({
              title: 'New notification',
              description: 'You have a new message in your inbox.',
              type: 'info',
            })
          }
        >
          Add notification
        </button>
        <button
          type="button"
          className={button.Root}
          onClick={() => {
            const messages = [
              'John liked your post',
              'Sarah commented on your photo',
              'New follower: @designpro',
              'Your post was shared 10 times',
              'Meeting reminder in 15 minutes',
            ]
            messages.forEach((msg) => {
              toaster.create({
                title: 'Notification',
                description: msg,
                type: 'info',
              })
            })
          }}
        >
          Add 5 notifications
        </button>
      </div>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <InfoIcon className={styles.Indicator} />
              <div style={{ flex: 1 }}>
                <Toast.Title className={styles.Title}>{toast.title}</Toast.Title>
                <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
              </div>
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
