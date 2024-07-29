import { forwardRef } from 'react'
import { Input } from './input'
import * as ArkPinInput from './primitives/pin-input'

export interface PinInputProps extends ArkPinInput.RootProps {
  /**
   * The number of inputs to render.
   * @default 4
   */
  length?: number
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
  const { children, length = 4, ...rootProps } = props

  return (
    <ArkPinInput.Root ref={ref} {...rootProps}>
      {children && <ArkPinInput.Label>{children}</ArkPinInput.Label>}
      <ArkPinInput.Control>
        {Array.from({ length }, (_, index) => index).map((id, index) => (
          <ArkPinInput.Input key={id} index={index} asChild>
            <Input size={rootProps.size} />
          </ArkPinInput.Input>
        ))}
      </ArkPinInput.Control>
      <ArkPinInput.HiddenInput />
    </ArkPinInput.Root>
  )
})

PinInput.displayName = 'PinInput'
