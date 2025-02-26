import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { getParts } from '../../../setup-test'
import { toastAnatomy } from '../toast.anatomy'
import { ComponentUnderTest } from './basic'

describe.skip('Toast / Parts & Exports', () => {
  afterEach(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(toastAnatomy))('should render part! %s', async (part) => {
    await user.click(screen.getByText('Create Toast'))

    expect(document.querySelector(part)).toBeInTheDocument()
  })
})

describe('Toast', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show and hide a toast message', async () => {
    let now = 1000

    vi.spyOn(globalThis.performance, 'now').mockImplementation(() => now)

    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
      now += 16 // Simulate frame progression (~16ms per frame at 60fps)
      setTimeout(() => fn(now), 0)
      return 1
    })

    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    render(<ComponentUnderTest />)

    await user.click(screen.getByText('Create Toast'))

    await waitFor(() => expect(screen.queryByText('Title')).toBeVisible())
    await waitFor(() => expect(screen.queryByText('Description')).toBeVisible())
    await user.click(screen.getByText('Close'))

    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
  })
})
