// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render } from '@testing-library/react/pure'
import { Clipboard } from '../'
import { CheckIcon, ClipboardCopyIcon } from '../stories/icons'

describe('Checkbox / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          Copy
          <Clipboard.Indicator copied={false}>
            <CheckIcon />
          </Clipboard.Indicator>
          <Clipboard.Indicator copied={false}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>,
  )

  //   it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
  //     // eslint-disable-next-line testing-library/no-node-access
  //     expect(document.querySelector(part)).toBeInTheDocument()
  //   })

  //   it.each(getExports(clipboardAna))('should export %s', async (part) => {
  //     expect(Checkbox[part]).toBeDefined()
  //   })
})
