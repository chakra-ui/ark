import user from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  type PopoverProps,
} from './'

const ComponentUnderTest = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverArrowTip />
      </PopoverArrow>
      <PopoverContent>
        <PopoverTitle>title</PopoverTitle>
        <PopoverDescription>description</PopoverDescription>
        <PopoverCloseTrigger>
          <button>close</button>
        </PopoverCloseTrigger>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)

describe('Popover', () => {
  it('should open and close the popover', async () => {
    const { getByRole, getByText, queryByText } = render(ComponentUnderTest)

    await user.click(getByText('click me'))
    expect(getByRole('dialog')).toBeInTheDocument()

    await user.click(getByText('close'))
    await waitFor(() => expect(queryByText('title')).not.toBeVisible())
  })

  it.skip('should hide the tooltip when escape is pressed', async () => {
    const { getByRole, getByText, queryByText } = render(ComponentUnderTest, {
      props: { closeOnEsc: true },
    })

    await user.click(getByText('click me'))
    expect(getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByText('title')).not.toBeVisible()
  })

  it('should focus the first focusable element', async () => {
    const { getByRole, getByText } = render(ComponentUnderTest)

    await user.click(getByText('click me'))
    expect(getByRole('dialog')).toBeInTheDocument()
  })
})
