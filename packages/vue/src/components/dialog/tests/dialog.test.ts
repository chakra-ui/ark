import user from '@testing-library/user-event'
import { cleanup, render, screen, waitFor } from '@testing-library/vue'
import { Dialog, dialogAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './dialog.test.vue'

describe('Dialog', () => {
  afterEach(() => {
    cleanup()
  })

  it.each(getParts(dialogAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(dialogAnatomy))('should export %s', async (part) => {
    expect(Dialog[part]).toBeDefined()
  })

  it('should show dialog content when opened', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('Open Dialog'))

    await waitFor(async () => expect(await screen.findByText('Dialog Title')).toBeVisible())

    await user.click(screen.getByText('Close'))
    await waitFor(async () => expect(await screen.findByText('Dialog Title')).not.toBeVisible())
  })
})
