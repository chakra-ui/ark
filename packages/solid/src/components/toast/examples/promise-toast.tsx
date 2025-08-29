import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, LoaderIcon, XIcon } from 'lucide-solid'
import { Dynamic } from 'solid-js/web'

const uploadFile = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
    }, 2000)
  })
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
        title: 'Uploading...',
        description: 'Please wait while we process your request.',
      },
      success: {
        title: 'Success!',
        description: 'Your request has been processed successfully.',
      },
      error: {
        title: 'Failed',
        description: 'Something went wrong. Please try again.',
      },
    })
  }

  const getIcon = (type: string | undefined) => {
    switch (type) {
      case 'loading':
        return LoaderIcon
      case 'success':
        return CircleCheckIcon
      case 'error':
        return CircleAlertIcon
      default:
        return InfoIcon
    }
  }

  return (
    <div>
      <button type="button" onClick={handleUpload}>
        Start Process
      </button>

      <Toaster toaster={toaster}>
        {(toast) => {
          const icon = () => getIcon(toast().type)
          return (
            <Toast.Root>
              <div style={{ display: 'flex', 'align-items': 'flex-start', gap: '12px' }}>
                <Dynamic
                  component={icon()}
                  style={toast().type === 'loading' ? { animation: 'spin 1s linear infinite' } : {}}
                />
                <div style={{ flex: 1 }}>
                  <Toast.Title>{toast().title}</Toast.Title>
                  <Toast.Description>{toast().description}</Toast.Description>
                </div>
                <Toast.CloseTrigger>
                  <XIcon />
                </Toast.CloseTrigger>
              </div>
            </Toast.Root>
          )
        }}
      </Toaster>
    </div>
  )
}
