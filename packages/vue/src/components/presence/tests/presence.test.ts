import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './presence.test.vue'

describe('Presence', () => {
  it('renders the unified data-presence-root attribute and no legacy scope/part attributes', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('box')).toBeVisible())
    const root = screen.getByTestId('box').closest('[data-presence-root]')
    expect(root).not.toBeNull()
    expect(root).not.toHaveAttribute('data-scope')
    expect(root).not.toHaveAttribute('data-part')
  })

  it('should control presence when not lazy mounting and not unmounting on exit', async () => {
    render(ComponentUnderTest)
    expect(screen.queryByTestId('box')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).not.toBeVisible())
  })

  it('should control presence when lazy mounting and not unmounting on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByTestId('box')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).not.toBeVisible())
  })

  it('should control presence when not lazy mounting and unmounting on exit ', async () => {
    render(ComponentUnderTest, { props: { unmountOnExit: true } })
    expect(screen.queryByTestId('box')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).not.toBeInTheDocument())
  })

  it('should control presence when lazy mounting and unmounting on exit', async () => {
    render(ComponentUnderTest, { props: { unmountOnExit: true, lazyMount: true } })

    expect(screen.queryByTestId('box')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('box')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByTestId('box')).not.toBeInTheDocument())
  })
})
