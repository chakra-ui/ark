import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { CircleAlertIcon, TriangleAlertIcon, CircleCheckIcon, InfoIcon, X } from 'lucide-react'

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
})

const iconMap = {
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  warning: TriangleAlertIcon,
  info: InfoIcon,
}

export const Types = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => toaster.success({ title: 'Success!', description: 'Your changes have been saved.' })}
        >
          Success
        </button>
        <button
          type="button"
          onClick={() =>
            toaster.error({ title: 'Error occurred', description: 'Something went wrong. Please try again.' })
          }
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => toaster.warning({ title: 'Warning', description: 'This action cannot be undone.' })}
        >
          Warning
        </button>
        <button
          type="button"
          onClick={() =>
            toaster.info({ title: 'New update available', description: 'Version 2.1.0 is now available for download.' })
          }
        >
          Info
        </button>
      </div>

      <Toaster toaster={toaster}>
        {(toast) => {
          const ToastIcon = toast.type ? iconMap[toast.type as keyof typeof iconMap] : undefined
          return (
            <Toast.Root key={toast.id}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {ToastIcon && <ToastIcon />}
                <div style={{ flex: 1 }}>
                  <Toast.Title>{toast.title}</Toast.Title>
                  <Toast.Description>{toast.description}</Toast.Description>
                </div>
                <Toast.CloseTrigger>
                  <X />
                </Toast.CloseTrigger>
              </div>
            </Toast.Root>
          )
        }}
      </Toaster>
    </div>
  )
}
