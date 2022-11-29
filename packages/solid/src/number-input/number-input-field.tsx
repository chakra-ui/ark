import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLArkProps<'input'>

export const NumberInputField = (props: NumberInputFieldProps) => {
  const numberInput = useNumberInputContext()

  return <ark.input {...numberInput().inputProps} {...props} />
}
