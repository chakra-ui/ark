import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from './'
import './pin-input.css'

const meta: Meta = {
  title: 'PinInput',
}

export default meta

export const Basic = () => (
  <PinInput placeholder="*" onValueComplete={(e) => console.log(e)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      <Index each={[0, 1, 2]}>{(id) => <PinInputInput index={id()} />}</Index>
    </PinInputControl>
  </PinInput>
)
