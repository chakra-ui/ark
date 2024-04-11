import { Toast, createToaster } from '../'

const [Toaster, toast] = createToaster({
  placement: 'top-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})

export const ComponentUnderTest = () => (
  <div>
    <button
      type="button"
      onClick={() => toast.create({ title: 'Title', description: 'Description' })}
    >
      Create Toast
    </button>
    <Toaster />
  </div>
)
