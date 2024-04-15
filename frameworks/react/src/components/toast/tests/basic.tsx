import { Toast, Toaster, createToaster } from '../'

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
          description: 'Description',
          type: 'info',
        })
      }
    >
      Create Toast
    </button>
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root key={toast.id}>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.ActionTrigger>Start</Toast.ActionTrigger>
          <Toast.CloseTrigger>Close</Toast.CloseTrigger>
        </Toast.Root>
      )}
    </Toaster>
  </div>
)
