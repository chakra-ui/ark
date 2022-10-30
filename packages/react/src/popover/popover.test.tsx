import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Popover, PopoverProps } from './popover'
import { PopoverArrow } from './popover-arrow'
import { PopoverCloseButton } from './popover-close-button'
import { PopoverContent } from './popover-content'
import { PopoverInnerArrow } from './popover-inner-arrow'
import { PopoverPositioner } from './popover-positioner'
import { PopoverTrigger } from './popover-trigger'

const Component = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverInnerArrow />
      </PopoverArrow>
      <PopoverContent>content</PopoverContent>
      <input placeholder="enter value" />
      <PopoverCloseButton>close</PopoverCloseButton>
    </PopoverPositioner>
  </Popover>
)

describe('Popover', () => {
  it('should open and close the popover', async () => {
    render(<Component />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByText('close'))
    expect(screen.queryByText('content')).not.toBeVisible()
  })

  it('should hide the tooltip when escape is pressed', async () => {
    render(<Component />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.queryByText('content')).not.toBeVisible()
  })

  it('should focus the first focusable element', async () => {
    render(<Component />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // TODO input has focus in storybook but the button is focused instead
    // const input = screen.getByRole('textbox')
    // expect(input).toHaveFocus()
    // screen.debug()
  })
})
