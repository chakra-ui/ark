import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'

export const Context = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Trigger>
          <Clipboard.Context>
            {(clipboard) => (
              <div>
                {clipboard.copied ? <CheckIcon /> : <ClipboardCopyIcon />}
                <span>{clipboard.copied ? 'Copied!' : 'Copy'}</span>
                <small>Value: {clipboard.value}</small>
              </div>
            )}
          </Clipboard.Context>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
