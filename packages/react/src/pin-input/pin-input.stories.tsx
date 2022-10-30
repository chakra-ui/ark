import type { Meta } from '@storybook/react'
import { PinInput } from './pin-input'
import { PinInputField } from './pin-input-field'

export default {
  title: 'React/PinInput',
} as Meta

export const basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    {[0, 1, 2].map((id, index) => (
      <PinInputField key={id} index={index} />
    ))}
  </PinInput>
)
