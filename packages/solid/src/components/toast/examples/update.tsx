import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

export const Update = () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 16,
  })

  const [id, setId] = createSignal<string | undefined>(undefined)

  const createToast = () => {
    const newId = toaster.create({
      title: 'Uploading file...',
      description: 'Please wait while your file is being uploaded.',
      type: 'loading',
    })
    setId(newId)
  }

  const updateToast = () => {
    const currentId = id()
    if (!currentId) {
      return
    }
    toaster.update(currentId, {
      title: 'Upload complete',
      description: 'Your file has been uploaded successfully.',
      type: 'success',
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" class={button.Root} onClick={createToast}>
          Start upload
        </button>
        <button type="button" class={button.Root} onClick={updateToast}>
          Complete upload
        </button>
      </div>
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root class={styles.Root}>
              <Toast.Title class={styles.Title}>{toast().title}</Toast.Title>
              <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
              <Toast.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
