import { render, screen, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import LazyMountDrawer from './tests/drawer-lazy-mount-unmount.test.svelte'

describe('Drawer.Backdrop', () => {
  it('respects lazyMount and unmountOnExit', async () => {
    const user = userEvent.setup()
    render(LazyMountDrawer)

    expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Drawer' }))
    await waitFor(() => expect(screen.getByTestId('drawer-backdrop')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: 'Close Drawer' }))
    await waitFor(() => expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument())
  })
})
