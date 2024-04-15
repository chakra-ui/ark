import type { Meta } from '@storybook/react'
import { XIcon } from 'lucide-react'
import { Toast, createToaster } from '../'
import { Toaster } from '../toaster'
import './toast.css'

const meta: Meta = {
  title: 'Components / Toast',
}
export default meta

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export const Basic = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toaster.create({
            title: 'Toast Title',
            description: 'Toast Description',
            type: 'info',
          })
        }
      >
        Add Toast
      </button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger>
              <XIcon />
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
