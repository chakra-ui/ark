import { useRef } from 'react'
import { Toast, Toaster, createToaster } from '../..'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export const Update = () => {
  const id = useRef<string>()

  const createToast = () => {
    id.current = toaster.create({
      title: 'Loading',
      description: 'Loading ...',
      type: 'info',
    })
  }

  const updateToast = () => {
    if (!id.current) {
      return
    }
    toaster.update(id.current, {
      title: 'Success',
      description: 'Success!',
    })
  }

  return (
    <div>
      <button type="button" onClick={createToast}>
        Create Toast
      </button>
      <button type="button" onClick={updateToast}>
        Update Toast
      </button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.ActionTrigger>Do Action</Toast.ActionTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
