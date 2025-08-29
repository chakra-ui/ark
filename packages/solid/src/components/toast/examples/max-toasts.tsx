import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon, InfoIcon } from 'lucide-solid'

export const MaxToasts = () => {
  const toaster = createToaster({
    max: 3,
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  return (
    <div>
      <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '8px' }}>
        <button
          type="button"
          onClick={() =>
            toaster.create({
              title: `Toast ${Date.now()}`,
              description: 'Maximum of 3 toasts visible at once. Extra toasts are queued.',
              type: 'info',
            })
          }
        >
          Add Toast
        </button>
        <button
          type="button"
          onClick={() => {
            for (let i = 1; i <= 5; i++) {
              toaster.create({
                title: `Toast ${i}`,
                description: `This is toast number ${i}`,
                type: 'info',
              })
            }
          }}
        >
          Add 5 Toasts
        </button>
      </div>

      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root>
            <div style={{ display: 'flex', 'align-items': 'flex-start', gap: '12px' }}>
              <InfoIcon />
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
