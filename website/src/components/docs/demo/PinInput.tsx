import { css, cx } from '@/panda/css'
import { input, pinInput } from '@/panda/recipes'
import { PinInput, type PinInputProps } from '@ark-ui/react'

export const DemoPinInput = (props: Partial<PinInputProps>) => (
  <PinInput.Root
    placeholder="0"
    onComplete={(e) => alert(e.valueAsString)}
    className={pinInput()}
    {...props}
  >
    <PinInput.Control>
      {[0, 1, 2, 3].map((id, index) => (
        <PinInput.Input
          key={id}
          index={index}
          className={cx(
            input({ size: '2xl', variant: 'outline' }),
            css({ width: '16', textAlign: 'center' }),
          )}
        />
      ))}
    </PinInput.Control>
  </PinInput.Root>
)
