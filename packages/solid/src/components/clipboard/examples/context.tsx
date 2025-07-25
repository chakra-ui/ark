import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show } from 'solid-js'

export const Context = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Trigger>
          <Clipboard.Context>
            {(clipboard) => (
              <div>
                <Show when={clipboard().copied} fallback={<ClipboardCopyIcon />}>
                  <CheckIcon />
                </Show>
                <span>
                  <Show when={clipboard().copied} fallback="Copy">
                    Copied!
                  </Show>
                </span>
                <small>Value: {clipboard().value}</small>
              </div>
            )}
          </Clipboard.Context>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
