import type { JSX } from 'solid-js'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = { index: number } & JSX.HTMLAttributes<HTMLInputElement>

export const PinInputField = (props: PinInputFieldProps) => {
  const { index, ...htmlProps } = props
  const pinInput = usePinInputContext()
  return (
    <input
      {...pinInput().getInputProps({
        index,
      })}
      {...htmlProps}
    />
  )
}
