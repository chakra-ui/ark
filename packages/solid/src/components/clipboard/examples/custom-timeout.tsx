import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show } from 'solid-js'

export const CustomTimeout = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com" timeout={5000}>
      <Clipboard.Label>Copy this link (5 second timeout)</Clipboard.Label>
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
    </Clipboard.Root>
  )
}
