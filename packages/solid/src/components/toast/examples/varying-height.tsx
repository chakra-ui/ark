import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const DESCRIPTIONS = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. For your security, please verify your identity by clicking the link sent to your email address.',
]

export const VaryingHeight = () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 16,
  })

  const [count, setCount] = createSignal(0)

  const createToast = () => {
    setCount((prev) => prev + 1)
    const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
    toaster.create({
      title: `Notification ${count()}`,
      description,
      type: 'info',
    })
  }

  return (
    <div>
      <button type="button" class={button.Root} onClick={createToast}>
        Create toast
      </button>
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
