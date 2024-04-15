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
  placement: 'top-end',
})

export const Basic = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toaster.create({
            id: 'a1',
            title: 'Success!',
            description: 'Something happened successfully.',
            type: 'success',
          })
        }
      >
        Add Toast
      </button>
      <button
        type="button"
        onClick={() => toaster.update('a1', { type: 'loading', title: 'Loading!' })}
      >
        Update Toast
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
