import { cleanup, render, screen } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { anatomy } from '@zag-js/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { axe } from 'vitest-axe'
import { Clipboard } from '../'
import { getExports, getParts } from '../../../setup-test'

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

describe('Checkbox / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(anatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Clipboard[part]).toBeDefined()
  })
})

describe('Clipboard', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should copy the value into the clipboard', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('https://ark-ui.com')
  })
})
