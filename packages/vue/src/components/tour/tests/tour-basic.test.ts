import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './tour-basic.test.vue'

const user = userEvent.setup()

const startTour = async () => {
  await user.click(screen.getByRole('button', { name: 'Start tour' }))
  return screen.findByRole('dialog')
}

describe('Tour parts', () => {
  it('should have no a11y violations when open', async () => {
    const { baseElement } = render(ComponentUnderTest)
    await startTour()

    expect(await axe(baseElement)).toHaveNoViolations()
  })

  it('should render nothing until started', () => {
    render(ComponentUnderTest)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument()
  })

  it('should render the current step', async () => {
    render(ComponentUnderTest)
    const dialog = await startTour()

    expect(dialog).toHaveTextContent('Welcome')
    expect(dialog).toHaveTextContent('Take a quick tour')
    expect(screen.getByTestId('progress')).toHaveTextContent(/1.*3/)
  })

  it('should label the content with the step title and description', async () => {
    render(ComponentUnderTest)
    const dialog = await startTour()

    expect(dialog).toHaveAccessibleName('Welcome')
    expect(dialog).toHaveAccessibleDescription('Take a quick tour')
  })

  it('should set the merged data attributes', async () => {
    render(ComponentUnderTest)
    const dialog = await startTour()

    expect(dialog).toHaveAttribute('data-tour-content')
    expect(screen.getByTestId('positioner')).toHaveAttribute('data-tour-positioner')
    expect(screen.getByText('Close tour')).toHaveAttribute('data-tour-close-trigger')
    expect(screen.getByRole('button', { name: 'Next' })).toHaveAttribute('data-tour-action-trigger')
  })

  it('should move between steps with the action triggers', async () => {
    const onStepChange = vi.fn()
    render(ComponentUnderTest, { props: { onStepChange } })
    await startTour()

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(await screen.findByText('Save your work')).toBeInTheDocument()
    expect(onStepChange).toHaveBeenLastCalledWith(expect.objectContaining({ stepId: 'save', stepIndex: 1 }))

    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(await screen.findByText('Welcome')).toBeInTheDocument()
    expect(onStepChange).toHaveBeenLastCalledWith(expect.objectContaining({ stepId: 'welcome', stepIndex: 0 }))
  })

  it('should dismiss with the close trigger', async () => {
    const onStatusChange = vi.fn()
    render(ComponentUnderTest, { props: { onStatusChange } })
    await startTour()

    await user.click(screen.getByText('Close tour'))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(onStatusChange).toHaveBeenLastCalledWith(expect.objectContaining({ status: 'dismissed' }))
  })

  it('should dismiss on Escape', async () => {
    render(ComponentUnderTest)
    await startTour()

    await user.keyboard('[Escape]')

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('should stay open on Escape when closeOnEscape is false', async () => {
    const onStatusChange = vi.fn()
    render(ComponentUnderTest, { props: { closeOnEscape: false, onStatusChange } })
    await startTour()

    await user.keyboard('[Escape]')

    expect(onStatusChange).not.toHaveBeenCalledWith(expect.objectContaining({ status: 'dismissed' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
