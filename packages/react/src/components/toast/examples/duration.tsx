import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon, ClockIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '∞', value: Infinity },
]

export const Duration = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {durations.map((duration) => (
          <button
            key={duration.label}
            type="button"
            className={button.Root}
            onClick={() =>
              toaster.create({
                title: 'Reminder set',
                description: `This notification will ${
                  duration.value === Infinity ? 'stay until dismissed' : `disappear in ${duration.label}`
                }.`,
                type: 'info',
                duration: duration.value,
              })
            }
          >
            {duration.label}
          </button>
        ))}
      </div>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <Toast.Title className={styles.Title}>
                <ClockIcon className={styles.Indicator} />
                {toast.title}
              </Toast.Title>
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
