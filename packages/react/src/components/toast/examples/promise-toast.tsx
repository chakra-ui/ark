import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon, LoaderIcon, CircleCheckIcon, CircleAlertIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const uploadFile = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
    }, 2000)
  })
}

export const PromiseToast = () => {
  const handleUpload = async () => {
    toaster.promise(uploadFile, {
      loading: {
        title: 'Uploading file...',
        description: 'Please wait while we upload your document.',
      },
      success: {
        title: 'Upload complete',
        description: 'Your file has been uploaded successfully.',
      },
      error: {
        title: 'Upload failed',
        description: 'Could not upload the file. Please try again.',
      },
    })
  }

  const getIcon = (type: string | undefined) => {
    switch (type) {
      case 'loading':
        return <LoaderIcon className={styles.Indicator} data-type="loading" />
      case 'success':
        return <CircleCheckIcon className={styles.Indicator} />
      case 'error':
        return <CircleAlertIcon className={styles.Indicator} />
      default:
        return null
    }
  }

  return (
    <div>
      <button type="button" className={button.Root} onClick={handleUpload}>
        Upload file
      </button>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <Toast.Title className={styles.Title}>
                {getIcon(toast.type)}
                {toast.title}
              </Toast.Title>
              <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
              <Toast.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
