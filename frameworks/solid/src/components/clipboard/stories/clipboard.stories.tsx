import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { Show } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Clipboard } from '../'
import './clipbard.css'

const meta: Meta = {
  title: 'Components / Clipboard',
}

export default meta

export const Basic = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Indicator copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}

export const RenderFn = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input />
        <Clipboard.Trigger>
          <Clipboard.Context>
            {(context) => (
              <Show when={context().isCopied} fallback={<ClipboardCopyIcon />}>
                <CheckIcon />
              </Show>
            )}
          </Clipboard.Context>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
