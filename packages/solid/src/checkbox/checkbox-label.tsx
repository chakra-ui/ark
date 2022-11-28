import { ark, HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLArkProps<'label'>

export const CheckboxLabel = (props: CheckboxLabelProps) => {
  const checkbox = useCheckboxContext()

  return <ark.label {...checkbox().labelProps} {...props} />
}
