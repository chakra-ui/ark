import { ark, HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLArkProps<'label'>

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const radioGroup = useRadioGroupContext()

  return <ark.label {...radioGroup().labelProps} {...props} />
}
