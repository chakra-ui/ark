import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon, ClockIcon } from 'lucide-react'

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
            onClick={() =>
              toaster.create({
                title: `Toast (${duration.label})`,
                description: `This toast will ${
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

      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <ClockIcon />
              <div style={{ flex: 1 }}>
                <Toast.Title>{toast.title}</Toast.Title>
                <Toast.Description>{toast.description}</Toast.Description>
              </div>
              <Toast.CloseTrigger>
                <XIcon />
              </Toast.CloseTrigger>
            </div>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
