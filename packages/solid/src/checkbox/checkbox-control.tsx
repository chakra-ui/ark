import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxControlProps = HTMLArkProps<'div'>

export const CheckboxControl = (props: CheckboxControlProps) => {
  const checkbox = useCheckboxContext()

  return <ark.div {...checkbox().controlProps} {...props} />
}
