import { PropsWithChildren } from 'react'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = PropsWithChildren<UsePinInputProps>

export const PinInput = (props: PinInputProps) => {
  const { children, ...rest } = props
  const { api } = usePinInput(rest)

  return (
    <PinInputProvider value={{ api }}>
      <div {...api.rootProps}>{children}</div>
    </PinInputProvider>
  )
}
