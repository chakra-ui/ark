import type { Meta } from '@storybook/react'
import { PinInput } from './'

type PinInputType = typeof PinInput

const meta: Meta<PinInputType> = {
  title: 'PinInput',
  component: PinInput,
}

export default meta

export const Basic = () => (
  <PinInput.Root placeholder="*" onValueComplete={(e) => alert(e.valueAsString)}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      {[0, 1, 2].map((id, index) => (
        <PinInput.Input key={id} index={index} />
      ))}
    </PinInput.Control>
  </PinInput.Root>
)
