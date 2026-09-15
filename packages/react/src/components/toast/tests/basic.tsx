import { Toast, Toaster, type ToasterProps, createToaster } from '@ark-ui/react/toast'

const toaster = createToaster({
  placement: 'bottom-end',
})

export const ComponentUnderTest = (props: Partial<ToasterProps>) => (
  <div>
    <button
      type="button"
      onClick={() =>
        toaster.create({
          title: 'Title',
          description: 'Description',
          type: 'info',
        })
      }
    >
      Create Toast
    </button>
    <Toaster toaster={toaster} label="Alerts" {...props}>
      {(toast) => (
        <Toast.Root key={toast.id}>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.ActionTrigger>Start</Toast.ActionTrigger>
          <Toast.CloseTrigger>Close</Toast.CloseTrigger>
        </Toast.Root>
      )}
    </Toaster>
  </div>
)
