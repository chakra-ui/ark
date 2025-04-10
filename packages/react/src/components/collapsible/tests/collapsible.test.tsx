import { act, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { ChevronDownIcon } from 'lucide-react'
import { axe } from 'vitest-axe'
import { Collapsible } from '../'

const ComponentUnderTest = (props: Collapsible.RootProps) => (
  <Collapsible.Root {...props}>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)

describe('Collapsible', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should toggle', async () => {
    render(<ComponentUnderTest />)

    expect(screen.getByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('should be fully controlled (true)', async () => {
    render(<ComponentUnderTest open={true} />)

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(<ComponentUnderTest open={false} />)

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await waitFor(() => expect(screen.getByText('Content')).not.toBeVisible())
  })

  it('should lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()
  })

  it('should unmount on exit ', async () => {
    render(<ComponentUnderTest unmountOnExit />)
    expect(screen.queryByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
  })
})
