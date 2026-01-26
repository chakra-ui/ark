import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon, XIcon } from 'lucide-solid'
import { Dynamic } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const iconMap = {
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  warning: TriangleAlertIcon,
  info: InfoIcon,
}

export const Types = () => {
  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', 'flex-wrap': 'wrap' }}>
        <button
          type="button"
          class={button.Root}
          onClick={() =>
            toaster.success({ title: 'Changes saved', description: 'Your profile has been updated successfully.' })
          }
        >
          Success
        </button>
        <button
          type="button"
          class={button.Root}
          onClick={() =>
            toaster.error({ title: 'Upload failed', description: 'There was an error uploading your file.' })
          }
        >
          Error
        </button>
        <button
          type="button"
          class={button.Root}
          onClick={() =>
            toaster.warning({ title: 'Low storage', description: 'You have less than 10% storage remaining.' })
          }
        >
          Warning
        </button>
        <button
          type="button"
          class={button.Root}
          onClick={() =>
            toaster.info({ title: 'Update available', description: 'A new version of the app is ready to install.' })
          }
        >
          Info
        </button>
      </div>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => {
            const icon = () => (toast().type ? iconMap[toast().type as keyof typeof iconMap] : InfoIcon)
            return (
              <Toast.Root class={styles.Root}>
                <Toast.Title class={styles.Title}>
                  <Dynamic component={icon()} class={styles.Indicator} />
                  {toast().title}
                </Toast.Title>
                <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
                <Toast.CloseTrigger class={styles.CloseTrigger}>
                  <XIcon />
                </Toast.CloseTrigger>
              </Toast.Root>
            )
          }}
        </Toaster>
      </Portal>
    </div>
  )
}
