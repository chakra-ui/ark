import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { ComponentUnderTest } from './basic'

describe('Toast', () => {
  it('should show and hide a toast message', async () => {
    render(() => <ComponentUnderTest />)
    await user.click(screen.getByText('Create Toast'))

    await waitFor(() => expect(screen.queryByText('Title')).toBeVisible())
    await waitFor(() => expect(screen.queryByText('Description')).toBeVisible())
    await user.click(screen.getByText('Close'))

    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('Description')).not.toBeInTheDocument())
  })
})
