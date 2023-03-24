import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlProps = HTMLArkProps<'div'>

export const NumberInputControl = (props: NumberInputControlProps) => {
  const numberInput = useNumberInputContext()

  return <ark.div {...numberInput().controlProps} {...props} />
}
