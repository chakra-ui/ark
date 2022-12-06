import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementButtonProps = HTMLArkProps<'button'>

export const NumberInputDecrementButton = (props: NumberInputDecrementButtonProps) => {
  const numberInput = useNumberInputContext()

  return <ark.button {...numberInput().decrementButtonProps} {...props} />
}
