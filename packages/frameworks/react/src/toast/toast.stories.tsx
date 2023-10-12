import type { Meta } from '@storybook/react'
import { Toast, createToaster } from '.'
import './toast.css'

const meta: Meta = {
  title: 'Toast',
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
    <button onClick={() => toast.create({ title: 'Title', description: 'Description' })}>
      Toast
    </button>
    <Toaster />
  </>
)
