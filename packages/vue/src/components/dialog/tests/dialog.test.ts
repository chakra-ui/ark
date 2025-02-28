import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './dialog.test.vue'

describe('Dialog', () => {
  it('should show dialog content when opened', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('Open Dialog'))

    await waitFor(async () => expect(await screen.findByText('Dialog Title')).toBeVisible())

    await user.click(screen.getByText('Close'))
    await waitFor(async () => expect(await screen.findByText('Dialog Title')).not.toBeVisible())
  })
})
