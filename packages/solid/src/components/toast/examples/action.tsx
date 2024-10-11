import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'

const toaster = createToaster({
  placement: 'bottom-end',
  gap: 24,
})

export const Action = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toaster.create({
            title: 'Toast Title',
            description: 'Toast Description',
            type: 'info',
            action: {
              label: 'Subscribe',
              onClick: () => {
                console.log('Subscribe')
              },
            },
          })
        }
      >
        Add Toast
      </button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root>
            <Toast.Title>{toast().title}</Toast.Title>
            <Toast.Description>{toast().description}</Toast.Description>
            {toast().action && <Toast.ActionTrigger>{toast().action?.label}</Toast.ActionTrigger>}
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
