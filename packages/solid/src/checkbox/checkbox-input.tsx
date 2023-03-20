import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLArkProps<'input'>

export const CheckboxInput = (props: CheckboxInputProps) => {
  const checkbox = useCheckboxContext()

  return <ark.input {...checkbox().inputProps} {...props} />
}
