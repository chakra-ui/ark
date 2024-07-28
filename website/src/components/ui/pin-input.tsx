import { forwardRef } from 'react'
import { PinInput as ArkPinInput } from '~/components/ui/primitives'
import { Input } from '~/components/ui/primitives'

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
