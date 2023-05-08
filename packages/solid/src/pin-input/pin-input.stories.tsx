import { For } from 'solid-js'
import { PinInput, PinInputControl, PinInputField, PinInputLabel } from './'

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => console.log(e)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      <For each={[0, 1, 2]}>{(id) => <PinInputField index={id} />}</For>
    </PinInputControl>
  </PinInput>
)
