import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Collapsible, type CollapsibleRootProps, collapsibleAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'

const ComponentUnderTest = (props: CollapsibleRootProps) => (
  <Collapsible.Root {...props}>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)

describe('Collapsible / Parts & Exports', () => {
  it.each(getParts(collapsibleAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(collapsibleAnatomy))('should export %s', async (part) => {
    expect(Collapsible[part]).toBeDefined()
  })
})

describe('Collapsible', () => {
  it('should toggle', async () => {
    render(() => <ComponentUnderTest />)

    expect(screen.getByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await waitFor(() => {
      expect(screen.queryByText('Content')).toBeVisible()
    })
  })

  it('should lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))

    await waitFor(() => {
      expect(screen.queryByText('Content')).toBeVisible()
    })
  })

  it('should unmount on exit ', async () => {
    render(() => <ComponentUnderTest unmountOnExit />)
    expect(screen.queryByText('Content')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))

    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })
})
