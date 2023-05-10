import { For } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { PinInput, PinInputControl, PinInputField, PinInputLabel } from '.'
import './pin-input.css'

const meta: Meta = {
  title: 'PinInput',
}

export default meta

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => console.log(e)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      <For each={[0, 1, 2]}>{(id) => <PinInputField index={id} />}</For>
    </PinInputControl>
  </PinInput>
)
