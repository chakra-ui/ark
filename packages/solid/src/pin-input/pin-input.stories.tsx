import type { Meta } from 'storybook-solidjs'
import { PinInput, PinInputControl, PinInputField, PinInputLabel } from '.'
import './pin-input.css'

const meta: Meta = {
  title: 'PinInput',
}

export default meta

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      {[0, 1, 2].map((id) => (
        <PinInputField index={id} />
      ))}
    </PinInputControl>
  </PinInput>
)
