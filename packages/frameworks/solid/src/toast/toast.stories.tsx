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
  render() {
    return (
      <Toast.Root>
        <Toast.Title />
        <Toast.Description />
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

export const Custom = () => (
  <>
    <button
      onClick={() =>
        toast().create({
          title: 'Title',
          description: 'Description',
          render: () => {
            return (
              <Toast.Root>
                <Toast.Title />
                <Toast.Description />
                <Toast.CloseTrigger>asdfasdfasdf</Toast.CloseTrigger>
              </Toast.Root>
            )
          },
        })
      }
    >
      Toast
    </button>
    <Toaster />
  </>
)
