import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Toast } from './toast'
import { ToastCloseTrigger } from './toast-close-trigger'
import { ToastDescription } from './toast-description'
import { ToastGroup } from './toast-group'
import { ToastPlacements } from './toast-placements'
import { ToastProvider, useToast, type ToastProviderProps } from './toast-provider'
import { ToastTitle } from './toast-title'

const ExampleToastProvider = (props: ToastProviderProps) => (
  <ToastProvider>
    <ToastPlacements>
      {(placements) =>
        placements.map((placement) => (
          <ToastGroup key={placement} placement={placement}>
            {(toasts) =>
              toasts.map((toast) => (
                <Toast key={toast.id} toast={toast}>
                  <ToastTitle />
                  <ToastDescription />
                  <ToastCloseTrigger>Close</ToastCloseTrigger>
                </Toast>
              ))
            }
          </ToastGroup>
        ))
      }
    </ToastPlacements>
    {props.children}
  </ToastProvider>
)

const ComponentUnderTest = () => {
  const toast = useToast()
  return (
    <button
      onClick={() => {
        toast.create({
          title: 'Toast title',
          description: 'Toast description',
          removeDelay: 0,
        })
      }}
    >
      Add toast
    </button>
  )
}

const renderToastComponent = () => render(<ComponentUnderTest />, { wrapper: ExampleToastProvider })

describe('Toast', () => {
  it('should render', async () => {
    renderToastComponent()
  })

  it('should show a toast message', async () => {
    renderToastComponent()
    await user.click(screen.getByText('Add toast'))
    expect(screen.getByText('Toast title')).toBeInTheDocument()
    expect(screen.getByText('Toast description')).toBeInTheDocument()
  })

  it('should hide a toast message after close button is clicked', async () => {
    renderToastComponent()
    await user.click(screen.getByText('Add toast'))

    expect(screen.getByText('Toast title')).toBeInTheDocument()
    expect(screen.getByText('Toast description')).toBeInTheDocument()

    await user.click(screen.getByText('Close'))

    expect(screen.queryByText('Toast title')).toBeNull()
    expect(screen.queryByText('Toast description')).toBeNull()
  })
})
