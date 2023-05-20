import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
  type TooltipProps,
} from './'

const ComponentUnderTest = (props: Omit<TooltipProps, 'children'>) => (
  <Tooltip openDelay={0} closeDelay={0} {...props}>
    <TooltipTrigger>hover me</TooltipTrigger>
    <TooltipPositioner>
      <TooltipArrow>
        <TooltipArrowTip />
      </TooltipArrow>
      <TooltipContent>content</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
)

describe('Tooltip', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })
  it('should show the tooltip on pointerover and close on pointer leave', async () => {
    render(() => <ComponentUnderTest />)

    const tooltipTrigger = screen.getByText('hover me')

    await user.hover(tooltipTrigger)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(tooltipTrigger)
    expect(screen.queryByText('content')).not.toBeInTheDocument()
  })

  it('should show on pointerover if isDisabled has a falsy value', async () => {
    render(() => <ComponentUnderTest disabled={false} />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('hover me')).toBeInTheDocument()
  })

  it('should hide the tooltip when escape is pressed', async () => {
    render(() => <ComponentUnderTest closeOnEsc />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.queryByText('content')).not.toBeInTheDocument()
  })

  it('should not hide the tooltip when escape is pressed if closeOnEsc is set to false', async () => {
    render(() => <ComponentUnderTest closeOnEsc={false} />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('should have pointer-events none style if interactive is set to false', async () => {
    render(() => <ComponentUnderTest interactive={false} />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    const tooltipContent = screen.getByText('content')
    expect(tooltipContent).toHaveStyle({ 'pointer-events': 'none' })
  })
})
