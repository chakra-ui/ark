import { tooltipAnatomy } from '@ark-ui/anatomy'
import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Tooltip } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Tooltip', () => {
  it.each(getParts(tooltipAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(tooltipAnatomy))('should export %s', async (part) => {
    expect(Tooltip[part]).toBeDefined()
  })

  it('should show the tooltip on pointerover and close on pointer leave', async () => {
    render(() => <ComponentUnderTest />)

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(tooltipTrigger)

    await waitFor(() => expect(screen.queryByText('content')).not.toBeVisible())
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
    await waitFor(() => expect(screen.queryByText('content')).not.toBeVisible())
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

  it('should lazy render the tooltip', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeVisible())
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    const tooltipTrigger = screen.getByText('hover me')
    await user.hover(tooltipTrigger)

    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })
})
