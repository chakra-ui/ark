import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import LazyMountDialog from './tests/dialog-lazy-mount-unmount.test.svelte'

describe('Dialog.Backdrop', () => {
  it('respects lazyMount and unmountOnExit', async () => {
    const user = userEvent.setup()
    render(LazyMountDialog)

    expect(screen.queryByTestId('dialog-backdrop')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    await waitFor(() => expect(screen.getByTestId('dialog-backdrop')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Close Dialog' }))
    await waitFor(() => expect(screen.queryByTestId('dialog-backdrop')).not.toBeInTheDocument())
  })
})
