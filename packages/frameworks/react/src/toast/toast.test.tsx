import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
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
  it('should show a toast message', async () => {
    render(<ComponentUnderTest />)
    await user.click(screen.getByText('Create Toast'))

    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getByText('Description')).toBeVisible()

    await user.click(screen.getByText('Close'))

    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeVisible()
      expect(screen.queryByText('Description')).not.toBeVisible()
    })
  })
})
