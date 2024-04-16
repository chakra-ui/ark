import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { Clipboard } from '../..'

export const Basic = () => {
  return (
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
}
