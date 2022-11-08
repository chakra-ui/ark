import { ToastProvider, useToast } from './toast-provider'

export const Basic = () => {
  return (
    <ToastProvider>
      <ExampleComponent />
    </ToastProvider>
  )
}

const ExampleComponent = () => {
  const toast = useToast()
  return (
    <div>
      <button
        onClick={() => {
          toast.create({ title: 'Hello', placement: 'top-right' })
        }}
      >
        Add top-right toast
      </button>
      <button
        onClick={() => {
          toast.create({
            title: 'Data submitted!',
            type: 'success',
            placement: 'bottom-right',
          })
        }}
      >
        Add bottom-right toast
      </button>
    </div>
  )
}
