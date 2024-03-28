import { clipboardAnatomy } from '@ark-ui/anatomy'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Clipboard } from '../'
import { getExports, getParts } from '../../setup-test'
import { CheckIcon, ClipboardCopyIcon } from '../stories/icons'

const ComponentUnderTest = () => (
  <Clipboard.Root value="https://ark-ui.com">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Indicator copied={<CheckIcon />}>
          <ClipboardCopyIcon />
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
)

describe('Clipboard', () => {
  it.each(getParts(clipboardAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(clipboardAnatomy))('should export %s', async (part) => {
    expect(Clipboard[part]).toBeDefined()
  })

  it('should copy the value into the clipboard', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('https://ark-ui.com')
  })
})
