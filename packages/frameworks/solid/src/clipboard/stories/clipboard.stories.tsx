import { Show } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Clipboard } from '../'
import './clipbard.css'
import { CheckIcon, ClipboardCopyIcon } from './icons'

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
      {(api) => (
        <>
          <Clipboard.Label>Copy this link</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input />
            <Clipboard.Trigger>
              <Show when={api().isCopied} fallback={<ClipboardCopyIcon />}>
                <CheckIcon />
              </Show>
            </Clipboard.Trigger>
          </Clipboard.Control>
        </>
      )}
    </Clipboard.Root>
  )
}
