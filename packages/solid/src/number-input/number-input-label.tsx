import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputLabelProps = HTMLArkProps<'label'>

export const NumberInputLabel = (props: NumberInputLabelProps) => {
  const numberInput = useNumberInputContext()

  return <ark.label {...numberInput().labelProps} {...props} />
}
