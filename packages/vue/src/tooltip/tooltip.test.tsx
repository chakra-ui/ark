import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
  type TooltipProps,
} from '.'

const Component = (props: TooltipProps) => (
  <Tooltip openDelay={0} closeDelay={0} {...props}>
    <TooltipTrigger>
      <button>hover me</button>
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipArrow>
        <TooltipArrowTip />
      </TooltipArrow>
      <TooltipContent>content</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
)

describe('Tooltip', () => {
  it('should show the tooltip on pointerover and close on pointer leave', async () => {
    const { getByText, getByRole, queryByText } = render(Component)

    const tooltipTrigger = getByText('hover me')
    await user.hover(tooltipTrigger)

    expect(getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(tooltipTrigger)

    expect(queryByText('content')).not.toBeInTheDocument()
  })

  it('should show on pointerover if isDisabled has a falsy value', async () => {
    const { getByText, findByRole } = render(Component, {
      props: {
        disabled: false,
      },
    })

    const tooltipTrigger = getByText('hover me')
    await user.hover(tooltipTrigger)

    await findByRole('tooltip')
    expect(getByText('hover me')).toBeInTheDocument()
  })

  it('should hide the tooltip when escape is pressed', async () => {
    const { getByText, findByRole, queryByText } = render(Component)

    const tooltipTrigger = getByText('hover me')
    await user.hover(tooltipTrigger)

    await findByRole('tooltip')
    expect(getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByText('content')).not.toBeInTheDocument()
  })

  it('should not hide the tooltip when escape is pressed if closeOnEsc is set to false', async () => {
    const { getByText, findByRole, getByRole } = render(Component, {
      props: {
        closeOnEsc: false,
      },
    })

    const tooltipTrigger = getByText('hover me')
    await user.hover(tooltipTrigger)

    await findByRole('tooltip')
    expect(getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(getByRole('tooltip')).toBeInTheDocument()
  })
})
