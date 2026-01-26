import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

export const Basic = () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 24,
  })

  return (
    <div>
      <button
        type="button"
        class={button.Root}
        onClick={() =>
          toaster.create({
            title: 'Scheduled for tomorrow',
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
            type: 'info',
          })
        }
      >
        Schedule meeting
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
