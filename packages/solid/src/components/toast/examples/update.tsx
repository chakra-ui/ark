import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { createSignal } from 'solid-js'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export const Update = () => {
  const [id, setId] = createSignal<string | undefined>(undefined)

  const createToast = () => {
    const newId = toaster.create({
      title: 'Loading',
      description: 'Loading ...',
      type: 'info',
    })
    setId(newId)
  }

  const updateToast = () => {
    const currentId = id()
    if (!currentId) {
      return
    }
    toaster.update(currentId, {
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
          <Toast.Root>
            <Toast.Title>{toast().title}</Toast.Title>
            <Toast.Description>{toast().description}</Toast.Description>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
