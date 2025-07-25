import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { useState } from 'react'

export const Controlled = () => {
  const [url, setUrl] = useState('https://ark-ui.com')

  const handleUrlChange = () => {
    setUrl('https://chakra-ui.com')
  }

  return (
    <Clipboard.Root value={url} onValueChange={({ value }) => setUrl(value)}>
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Indicator copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>

      <button onClick={handleUrlChange}>Change Url</button>
    </Clipboard.Root>
  )
}
