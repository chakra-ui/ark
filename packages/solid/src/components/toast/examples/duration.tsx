import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

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
              class={button.Root}
              onClick={() =>
                toaster.create({
                  title: `Duration: ${duration.label}`,
                  description:
                    duration.value === Infinity
                      ? 'This toast will stay until you dismiss it.'
                      : `This toast will automatically close in ${duration.label}.`,
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
