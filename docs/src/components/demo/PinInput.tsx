import { PinInput, PinInputControl, PinInputField } from '@ark-ui/react'
import { css, cx } from '../../../panda/css'
import { input, pinInput } from '../../../panda/recipes'

export const DemoPinInput = () => (
  <PinInput placeholder="0" onComplete={(e) => alert(e.valueAsString)} className={pinInput()}>
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
