import { XIcon } from 'lucide-solid'
import type { Meta } from 'storybook-solidjs'
import { Toast, Toaster, createToaster } from '../'
import './toast.css'

const meta: Meta = {
  title: 'Components / Toast',
}

export default meta

export const Basic = () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 24,
  })

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toaster.create({
            title: 'Loading!',
            description: 'We are loading something for you. Please wait.',
            type: 'info',
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
            <Toast.CloseTrigger>
              <XIcon />
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
