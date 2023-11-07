import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Toast, createToaster } from './'

const [Toaster, toast] = createToaster({
  placement: 'top-end',
  render() {
    return (
      <Toast.Root>
        <Toast.Title />
        <Toast.Description />
        <Toast.CloseTrigger>Close</Toast.CloseTrigger>
      </Toast.Root>
    )
  },
})

export const ComponentUnderTest = () => (
  <div>
    <button onClick={() => toast().create({ title: 'Title', description: 'Description' })}>
      Create Toast
    </button>
    <Toaster />
  </div>
)

describe('Toast', () => {
  it.skip('should show a toast message', async () => {
    render(() => <ComponentUnderTest />)
    await user.click(screen.getByText('Create Toast'))

    expect(screen.getByText('Title')).toBeVisible()
    expect(screen.getByText('Description')).toBeVisible()
    expect(screen.getByText('Close')).toBeVisible()
  })

  it('should hide a toast message after close button is clicked', async () => {
    render(() => <ComponentUnderTest />)
    await user.click(screen.getByText('Create Toast'))
    await waitFor(() => user.click(screen.getByText('Close')))
    await waitFor(() => expect(screen.queryByText('Title')).not.toBeVisible())
  })
})
