import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'

const toaster = createToaster({
  placement: 'bottom-end',
})

export const ComponentUnderTest = () => (
  <div>
    <button
      type="button"
      onClick={() =>
        toaster.create({
          title: 'Title',
          type: 'info',
        })
      }
    >
      Create Toast
    </button>
    <Toaster toaster={toaster} label="Alerts">
      {(toast) => (
        <Toast.Root key={toast.id} asChild>
          <section data-testid="custom-root">
            <Toast.Title>{toast.title}</Toast.Title>
          </section>
        </Toast.Root>
      )}
    </Toaster>
  </div>
)
