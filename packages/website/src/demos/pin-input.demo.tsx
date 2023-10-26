import { PinInput, type PinInputProps } from '~/components/ui'
import { Input } from '~/components/ui/input'

export const Demo = (props: PinInputProps) => (
  <PinInput.Root placeholder="0" onValueComplete={(e) => alert(e.valueAsString)}>
    <PinInput.Label>Pin Input</PinInput.Label>
    <PinInput.Control>
      {[0, 1, 2, 3].map((id, index) => (
        <PinInput.Input key={id} index={index} asChild>
          <Input size="lg" width="0" textAlign="center" />
        </PinInput.Input>
      ))}
    </PinInput.Control>
  </PinInput.Root>
)
