import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementButtonProps = HTMLArkProps<'button'>

export const NumberInputIncrementButton = (props: NumberInputIncrementButtonProps) => {
  const numberInput = useNumberInputContext()

  return <ark.button {...numberInput().incrementButtonProps} {...props} />
}
