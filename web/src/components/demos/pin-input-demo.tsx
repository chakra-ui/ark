import { Input } from '~/components/ui/input'
import {
  PinInput,
  PinInputControl,
  PinInputInput,
  type PinInputProps,
} from '~/components/ui/pin-input'

export const PinInputDemo = (props: PinInputProps) => (
  <PinInput placeholder="0" onComplete={(e) => alert(e.valueAsString)}>
    <PinInputControl>
      {[0, 1, 2, 3].map((id, index) => (
        <PinInputInput key={id} index={index} asChild>
          <Input size="xl" width="0" textAlign="center" />
        </PinInputInput>
      ))}
    </PinInputControl>
  </PinInput>
)
