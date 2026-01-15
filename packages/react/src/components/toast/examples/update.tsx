import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { useRef } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export const Update = () => {
  const id = useRef<string>(undefined)

  const createToast = () => {
    id.current = toaster.create({
      title: 'Sending message...',
      description: 'Please wait while we deliver your message.',
      type: 'loading',
    })
  }

  const updateToast = () => {
    if (!id.current) {
      return
    }
    toaster.update(id.current, {
      title: 'Message sent',
      description: 'Your message has been delivered successfully.',
      type: 'success',
    })
  }

  return (
    <div className="hstack">
      <button type="button" className={button.Root} onClick={createToast}>
        Send message
      </button>
      <button type="button" className={button.Root} onClick={updateToast}>
        Mark as sent
      </button>
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <Toast.Title className={styles.Title}>{toast.title}</Toast.Title>
              <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
