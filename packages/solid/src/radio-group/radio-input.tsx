import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioInputProps = HTMLArkProps<'input'>

export const RadioInput = (props: RadioInputProps) => {
  const radioGroup = useRadioGroupContext()
  const context = useRadioContext()

  return <ark.input {...radioGroup().getRadioInputProps(context)} {...props} />
}
