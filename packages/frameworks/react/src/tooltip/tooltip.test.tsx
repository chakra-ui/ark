import { tooltipAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { getExports, getParts } from '../setup-test'
import { Tooltip, type TooltipProps } from './'

const ComponentUnderTest = (props: TooltipProps) => (
  <Tooltip.Root openDelay={0} closeDelay={0} {...props}>
    <Tooltip.Trigger>hover me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
      <Tooltip.Content>content</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)

describe('Tooltip', () => {
  it.each(getParts(tooltipAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(tooltipAnatomy))('should export %s', async (part) => {
    expect(Tooltip[part]).toBeDefined()
  })

  it('should show the tooltip on pointerover and close on pointer leave', async () => {
    render(<ComponentUnderTest />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(tooltipTrigger)

    expect(screen.queryByText('content')).not.toBeVisible()
  })

  it('should show on pointerover if isDisabled has a falsy value', async () => {
    render(<ComponentUnderTest disabled={false} />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('hover me')).toBeInTheDocument()
  })

  it('should hide the tooltip when escape is pressed', async () => {
    render(<ComponentUnderTest closeOnEsc />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.queryByText('content')).not.toBeVisible()
  })

  it('should not hide the tooltip when escape is pressed if closeOnEsc is set to false', async () => {
    render(<ComponentUnderTest closeOnEsc={false} />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await screen.findByRole('tooltip')
    expect(screen.getByText('content')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('should have pointer-events none style if interactive is set to false', async () => {
    render(<ComponentUnderTest interactive={false} />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    const tooltipContent = screen.getByText('content')
    expect(tooltipContent).toHaveStyle({ 'pointer-events': 'none' })
  })
})
