import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import RootProviderWithComputedProps from './dialog-root-provider-computed-props.test.vue'
import ComponentUnderTest from './dialog.test.vue'

describe('Dialog', () => {
  it('should show dialog content when opened', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('Open Dialog'))

    await waitFor(async () => expect(await screen.findByText('Dialog Title')).toBeVisible())

    await waitFor(() => user.click(screen.getByText('Close')))
    await waitFor(async () => expect(await screen.findByText('Dialog Title')).not.toBeVisible())
  })

  it('should emit exitComplete when close animation completes', async () => {
    const onExitComplete = vi.fn()
    render(ComponentUnderTest, { props: { onExitComplete } })

    await user.click(screen.getByText('Open Dialog'))
    await waitFor(async () => expect(await screen.findByText('Dialog Title')).toBeVisible())

    await waitFor(() => user.click(screen.getByText('Close')))
    await waitFor(() => expect(onExitComplete).toHaveBeenCalled())
  })

  it('should apply computed props when using root provider with useDialog', async () => {
    render(RootProviderWithComputedProps)

    await user.click(screen.getByText('Open Dialog'))

    const dialog = await screen.findByRole('dialog')
    expect(dialog.id).toContain('test-id')
  })
})
