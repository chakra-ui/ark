import type { Meta } from '@storybook/react'
import { PinInput, PinInputControl, PinInputField, PinInputLabel } from './'

type PinInputType = typeof PinInput

const meta: Meta<PinInputType> = {
  title: 'PinInput',
  component: PinInput,
}

export default meta

export const Basic = () => (
  <PinInput placeholder="*" onComplete={(e) => alert(e.valueAsString)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      {[0, 1, 2].map((id, index) => (
        <PinInputField key={id} index={index} />
      ))}
    </PinInputControl>
  </PinInput>
)
