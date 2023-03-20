import { type Assign } from '@polymorphic-factory/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = Assign<HTMLArkProps<'input'>, { index: number }>

export const PinInputField = (props: PinInputFieldProps) => {
  const { index, ...htmlProps } = props
  const pinInput = usePinInputContext()
  return (
    <ark.input
      {...pinInput().getInputProps({
        index,
      })}
      {...htmlProps}
    />
  )
}
