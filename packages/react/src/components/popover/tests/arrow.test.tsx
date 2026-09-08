import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Arrow as ComponentUnderTest } from '../examples/arrow.tsx'
import { Popover } from '../index.ts'

const Decoy = () => (
  <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <div data-popover-arrow="another-overlay" data-testid="other-arrow" />
        <Popover.Arrow data-testid="own-arrow">
          <Popover.ArrowTip />
        </Popover.Arrow>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

const arrowEl = () => document.querySelector<HTMLElement>('[data-popover-arrow]')
describe('Popover / arrow', () => {
  it('should position the rendered arrow', async () => {
    render(<ComponentUnderTest />)
    await user.click(screen.getByRole('button', { name: 'Click Me' }))

    await waitFor(() => expect(arrowEl()).toBeInTheDocument())
    await waitFor(() => {
      const arrow = arrowEl()
      expect(arrow?.style.left || arrow?.style.top).toBeTruthy()
    })
  })

  it('should ignore an arrow belonging to another overlay', async () => {
    render(<Decoy />)
    await user.click(screen.getByRole('button', { name: 'Open' }))

    const own = await screen.findByTestId('own-arrow')
    await waitFor(() => expect(own.style.left || own.style.top).toBeTruthy())
    expect(screen.getByTestId('other-arrow').style.left).toBe('')
  })
})
