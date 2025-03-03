import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Clipboard } from '../'

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
  it('should copy the value into the clipboard', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('https://ark-ui.com')
  })
})
