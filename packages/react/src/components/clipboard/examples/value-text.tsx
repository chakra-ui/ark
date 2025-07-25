import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'

export const ValueText = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.ValueText />
      <Clipboard.Trigger>
        <Clipboard.Indicator copied={<CheckIcon />}>
          <ClipboardCopyIcon />
        </Clipboard.Indicator>
        Copy
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
