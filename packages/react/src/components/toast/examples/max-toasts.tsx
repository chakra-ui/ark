import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon, InfoIcon } from 'lucide-react'

const toaster = createToaster({
  max: 3,
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

export const MaxToasts = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
          <Toast.Root key={toast.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <InfoIcon />
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
