import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { useState } from 'react'

export const CopyStatus = () => {
  const [copyCount, setCopyCount] = useState(0)

  return (
    <Clipboard.Root
      value="https://ark-ui.com"
      onStatusChange={(details) => {
        if (details.copied) {
          setCopyCount((prev) => prev + 1)
        }
      }}
    >
      <Clipboard.Trigger>
        <Clipboard.Indicator copied={<CheckIcon />}>
          <ClipboardCopyIcon />
        </Clipboard.Indicator>
        Copy
      </Clipboard.Trigger>
      <p>Copied {copyCount} times</p>
    </Clipboard.Root>
  )
}
