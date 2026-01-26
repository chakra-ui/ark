import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
})

const DESCRIPTIONS = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. For your security, please verify your identity by clicking the link sent to your email address.',
]

export const VaryingHeight = () => {
  const [count, setCount] = useState(0)

  const createToast = () => {
    setCount((prev) => prev + 1)
    const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
    toaster.create({
      title: `Notification ${count + 1}`,
      description,
      type: 'info',
    })
  }

  return (
    <div>
      <button type="button" className={button.Root} onClick={createToast}>
        Create toast
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
