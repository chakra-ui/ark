import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show } from 'solid-js'

export const ValueText = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.ValueText />
      <Clipboard.Trigger>
        <Clipboard.Indicator>
          <Show when={false} fallback={<ClipboardCopyIcon />}>
            <CheckIcon />
          </Show>
        </Clipboard.Indicator>
        Copy
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
