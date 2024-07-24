import { timePickerAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { cleanup, render, screen, waitFor } from '@testing-library/vue'
import { TimePicker } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './time-picker.test.vue'

describe('Time Picker / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(ComponentUnderTest)

  const parts = getParts(timePickerAnatomy).filter((part) => part.includes('Cell'))
  it.each(parts)('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  const exports = getExports(timePickerAnatomy)
  const exportsWithoutCell = exports.filter(
    (part): part is Exclude<(typeof exports)[number], 'Cell'> => part !== 'Cell',
  )
  it.each(exportsWithoutCell)('should export %s', async (part) => {
    expect(TimePicker[part]).toBeDefined()
  })
})

describe('Time Picker', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able to lazy mount', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  }, 10000)

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close calendar' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  }, 10000)

  it('should be fully controlled (true)', async () => {
    render(ComponentUnderTest, { props: { open: true } })

    const closeButton = screen.getByRole('button', { name: 'Close calendar' })

    expect(closeButton).toBeVisible()

    await user.click(closeButton)
    expect(closeButton).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(ComponentUnderTest, { props: { open: false } })

    const closeButton = screen.queryByRole('button', { name: 'Close calendar' })
    expect(closeButton).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(closeButton).not.toBeInTheDocument()
  })
})
