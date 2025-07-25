import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show, createSignal } from 'solid-js'

export const CopyStatus = () => {
  const [copyCount, setCopyCount] = createSignal(0)

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
        <Clipboard.Indicator>
          <Show when={false} fallback={<ClipboardCopyIcon />}>
            <CheckIcon />
          </Show>
        </Clipboard.Indicator>
        Copy
      </Clipboard.Trigger>
      <p>Copied {copyCount()} times</p>
    </Clipboard.Root>
  )
}
