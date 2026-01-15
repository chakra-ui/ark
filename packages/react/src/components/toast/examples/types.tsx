import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { CircleAlertIcon, TriangleAlertIcon, CircleCheckIcon, InfoIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const iconMap = {
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  warning: TriangleAlertIcon,
  info: InfoIcon,
}

export const Types = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={button.Root}
          onClick={() =>
            toaster.success({ title: 'Changes saved', description: 'Your profile has been updated successfully.' })
          }
        >
          Success
        </button>
        <button
          type="button"
          className={button.Root}
          onClick={() =>
            toaster.error({ title: 'Upload failed', description: 'There was an error uploading your file.' })
          }
        >
          Error
        </button>
        <button
          type="button"
          className={button.Root}
          onClick={() =>
            toaster.warning({ title: 'Low storage', description: 'You have less than 10% storage remaining.' })
          }
        >
          Warning
        </button>
        <button
          type="button"
          className={button.Root}
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
            const ToastIcon = toast.type ? iconMap[toast.type as keyof typeof iconMap] : undefined
            return (
              <Toast.Root key={toast.id} className={styles.Root}>
                <Toast.Title className={styles.Title}>
                  {ToastIcon && <ToastIcon className={styles.Indicator} />}
                  {toast.title}
                </Toast.Title>
                <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
                <Toast.CloseTrigger className={styles.CloseTrigger}>
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
