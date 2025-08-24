import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon, ClockIcon } from 'lucide-solid'
import { For } from 'solid-js'

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '∞', value: Infinity },
]

export const Duration = () => {
  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  return (
    <div>
      <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '8px' }}>
        <For each={durations}>
          {(duration) => (
            <button
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
          )}
        </For>
      </div>

      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root>
            <div style={{ display: 'flex', 'align-items': 'flex-start', gap: '12px' }}>
              <ClockIcon />
              <div style={{ flex: 1 }}>
                <Toast.Title>{toast().title}</Toast.Title>
                <Toast.Description>{toast().description}</Toast.Description>
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
