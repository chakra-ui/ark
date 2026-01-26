import { Portal } from 'solid-js/web'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, LoaderIcon, XIcon } from 'lucide-solid'
import { Dynamic } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const uploadFile = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
    }, 2000)
  })
}

const iconMap = {
  loading: LoaderIcon,
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  info: InfoIcon,
}

export const PromiseToast = () => {
  const toaster = createToaster({
    overlap: true,
    placement: 'bottom-end',
    gap: 16,
  })

  const handleUpload = async () => {
    toaster.promise(uploadFile, {
      loading: {
        title: 'Uploading file...',
        description: 'Please wait while we process your file.',
      },
      success: {
        title: 'Upload complete',
        description: 'Your file has been uploaded successfully.',
      },
      error: {
        title: 'Upload failed',
        description: 'There was an error uploading your file. Please try again.',
      },
    })
  }

  return (
    <div>
      <button type="button" class={button.Root} onClick={handleUpload}>
        Upload file
      </button>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => {
            const icon = () => (toast().type ? iconMap[toast().type as keyof typeof iconMap] : InfoIcon)
            return (
              <Toast.Root class={styles.Root}>
                <Toast.Title class={styles.Title}>
                  <Dynamic
                    component={icon()}
                    class={styles.Indicator}
                    style={toast().type === 'loading' ? { animation: 'spin 1s linear infinite' } : {}}
                  />
                  {toast().title}
                </Toast.Title>
                <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
                <Toast.CloseTrigger class={styles.CloseTrigger}>
                  <XIcon />
                </Toast.CloseTrigger>
              </Toast.Root>
            )
          }}
        </Toaster>
      </Portal>
    </div>
  )
}
