import type { Meta } from 'storybook-solidjs'
import { Toast, createToaster } from './'
import './toast.css'

type ToastType = typeof Toast

const meta: Meta<ToastType> = {
  title: 'Toast',
  component: Toast,
}

export default meta

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

export const Basic = () => (
  <>
    <button onClick={() => toast().create({ title: 'Title', description: 'Description' })}>
      Toast
    </button>
    <Toaster />
  </>
)
