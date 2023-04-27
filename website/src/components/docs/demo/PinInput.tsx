import { css, cx } from '@/panda/css'
import { input, pinInput } from '@/panda/recipes'
import { PinInput, PinInputControl, PinInputField, type PinInputProps } from '@ark-ui/react'

export const DemoPinInput = (props: Partial<PinInputProps>) => (
  <PinInput
    placeholder="0"
    onComplete={(e) => alert(e.valueAsString)}
    className={pinInput()}
    {...props}
  >
    <PinInputControl>
      {[0, 1, 2, 3].map((id, index) => (
        <PinInputField
          key={id}
          index={index}
          className={cx(
            input({ size: '2xl', variant: 'outline' }),
            css({ width: '16', textAlign: 'center' }),
          )}
        />
      ))}
    </PinInputControl>
  </PinInput>
)
