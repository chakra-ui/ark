import { render, screen, waitFor } from '@testing-library/svelte'
import { flushSync, tick } from 'svelte'
import { describe, expect, it } from 'vitest'
import PortalContainerFixture from './tests/portal-container-fixture.svelte'
import PortalFixture from './tests/portal-fixture.svelte'

describe('Portal', () => {
  it('should render children into the container', async () => {
    render(PortalFixture)
    await waitFor(() => expect(screen.getByTestId('portal-content')).toBeInTheDocument())
  })

  it('should remove children on unmount', async () => {
    const { unmount } = render(PortalFixture)
    await waitFor(() => expect(screen.getByTestId('portal-content')).toBeInTheDocument())
    unmount()
    expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument()
  })

  it('should not mount children when unmounted before the deferred mount resolves', async () => {
    const { unmount } = render(PortalFixture)
    unmount()
    await tick()
    await tick()
    flushSync()
    expect(screen.queryByTestId('portal-content')).not.toBeInTheDocument()
  })

  it('should move children when the container changes', async () => {
    const a = document.body.appendChild(document.createElement('div'))
    const b = document.body.appendChild(document.createElement('div'))
    const { rerender } = render(PortalContainerFixture, { container: a })
    await waitFor(() => expect(a).toContainElement(screen.getByTestId('portal-content')))

    await rerender({ container: b })
    await waitFor(() => expect(b).toContainElement(screen.getByTestId('portal-content')))
    expect(screen.getAllByTestId('portal-content')).toHaveLength(1)
    a.remove()
    b.remove()
  })
})
