import { ark, HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = HTMLArkProps<'div'>

export const RadioControl = (props: RadioControlProps) => {
  const radioGroup = useRadioGroupContext()
  const context = useRadioContext()

  return <ark.div {...radioGroup().getItemControlProps(context)} {...props} />
}
