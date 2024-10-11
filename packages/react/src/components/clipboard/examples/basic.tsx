import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'

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
