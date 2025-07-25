import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show, createSignal } from 'solid-js'

export const Controlled = () => {
  const [url, setUrl] = createSignal('https://ark-ui.com')

  const handleUrlChange = () => {
    setUrl('https://chakra-ui.com')
  }

  return (
    <Clipboard.Root value={url()} onValueChange={({ value }) => setUrl(value)}>
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Indicator>
            <Show when={false} fallback={<ClipboardCopyIcon />}>
              <CheckIcon />
            </Show>
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>

      <button onClick={handleUrlChange}>Change Url</button>
    </Clipboard.Root>
  )
}
