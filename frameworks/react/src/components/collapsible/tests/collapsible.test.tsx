import { collapsibleAnatomy } from '@ark-ui/anatomy'
import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { Collapsible, type CollapsibleRootProps } from '../'
import { getExports, getParts } from '../../../setup-test'

const ComponentUnderTest = (props: CollapsibleRootProps) => (
  <Collapsible.Root {...props}>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)

describe('Collapsible / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(collapsibleAnatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(collapsibleAnatomy))('should export %s', async (part) => {
    expect(Collapsible[part]).toBeDefined()
  })
})

describe('Collapsible', () => {
  afterEach(() => {
    cleanup()
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
    await waitForElementToBeRemoved(screen.getByText('Content'))
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await waitForElementToBeRemoved(screen.getByText('Content'))
  })
})
