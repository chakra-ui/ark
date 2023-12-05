import { toastAnatomy } from '@ark-ui/anatomy'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { getExports, getParts } from '../setup-test'
import { Toast, createToaster } from './'

const [Toaster, toast] = createToaster({
  placement: 'top-end',
  render(toast) {
    return (
      <Toast.Root>
        <Toast.Title>{toast.title}</Toast.Title>
        <Toast.Description>{toast.description}</Toast.Description>
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})

export const ComponentUnderTest = () => (
  <div>
    <button onClick={() => toast.create({ title: 'Title', description: 'Description' })}>
      Create Toast
    </button>
    <Toaster />
  </div>
)

describe('Toast', () => {
  it.each(getParts(toastAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    await user.click(screen.getByText('Create Toast'))
    expect(document.querySelector(part)).toBeInTheDocument()
    await user.click(screen.getByText('Close'))
  })

  it.each(getExports(toastAnatomy))('should export %s', async (part) => {
    expect(Toast[part]).toBeDefined()
  })

  it('should show and hide a toast message', async () => {
    render(<ComponentUnderTest />)
    await user.click(screen.getByText('Create Toast'))

    await waitFor(() => expect(screen.queryByText('Title')).toBeVisible())
    await waitFor(() => expect(screen.queryByText('Description')).toBeVisible())

    await user.click(screen.getByText('Close'))

    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('Description')).not.toBeInTheDocument())
  })
})
