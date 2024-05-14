import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { Clipboard } from '../..'

export const RenderFn = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Context>
            {(clipboard) => (clipboard.copied ? <CheckIcon /> : <ClipboardCopyIcon />)}
          </Clipboard.Context>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
