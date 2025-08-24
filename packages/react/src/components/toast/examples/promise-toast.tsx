import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon, LoaderIcon, CircleCheckIcon, CircleAlertIcon } from 'lucide-react'

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
        return <LoaderIcon size={20} style={{ animation: 'spin 1s linear infinite' }} />
      case 'success':
        return <CircleCheckIcon size={20} />
      case 'error':
        return <CircleAlertIcon size={20} />
      default:
        return null
    }
  }

  return (
    <div>
      <button type="button" onClick={handleUpload}>
        Start Process
      </button>

      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              {getIcon(toast.type)}
              <div style={{ flex: 1 }}>
                <Toast.Title>{toast.title}</Toast.Title>
                <Toast.Description>{toast.description}</Toast.Description>
              </div>
              <Toast.CloseTrigger>
                <XIcon />
              </Toast.CloseTrigger>
            </div>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
