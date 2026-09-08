import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Popover } from '../index.ts'

const ComponentUnderTest = () => (
  <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow data-testid="arrow">
          <Popover.ArrowTip />
        </Popover.Arrow>
        Content
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

describe('Popover / arrow', () => {
  it('should position the arrow that is actually rendered', async () => {
    render(<ComponentUnderTest />)
    await user.click(screen.getByRole('button', { name: 'Open' }))

    const arrow = await screen.findByTestId('arrow')
    await new Promise((resolve) => setTimeout(resolve, 50))

    // popper writes the resolved offsets onto the arrow it was given, so an
    // unpositioned arrow means popper never found this element
    expect(arrow.style.left || arrow.style.top).toBeTruthy()
  })
})
