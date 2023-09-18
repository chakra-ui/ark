import type { Meta } from '@storybook/react'
import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from './'

type PinInputType = typeof PinInput

const meta: Meta<PinInputType> = {
  title: 'PinInput',
  component: PinInput,
}

export default meta

export const Basic = () => (
  <PinInput placeholder="*" onValueComplete={(e) => alert(e.valueAsString)}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      {[0, 1, 2].map((id, index) => (
        <PinInputInput key={id} index={index} />
      ))}
    </PinInputControl>
  </PinInput>
)
