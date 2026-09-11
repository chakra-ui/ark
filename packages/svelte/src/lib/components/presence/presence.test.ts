import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Presence', () => {
  it('renders the unified data-presence-root attribute and no legacy scope/part attributes', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByRole('button'))
    const box = await waitFor(() => {
      const el = screen.getByText('Content')
      expect(el).toBeVisible()
      return el
    })
    expect(box).toHaveAttribute('data-presence-root')
    expect(box).not.toHaveAttribute('data-scope')
    expect(box).not.toHaveAttribute('data-part')
  })

  it('should control presence when not lazy mounting and not unmounting on exit', async () => {
    render(ComponentUnderTest)

    expect(screen.queryByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeVisible())
  })

  it('should control presence when lazy mounting and not unmounting on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).toBeVisible())

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeVisible())
  })

  it('should control presence when not lazy mounting and unmounting on exit ', async () => {
    render(ComponentUnderTest, { props: { unmountOnExit: true } })
    expect(screen.queryByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
  })

  it('should control presence when lazy mounting and unmounting on exit', async () => {
    render(ComponentUnderTest, {
      props: { unmountOnExit: true, lazyMount: true },
    })

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
  })
})
