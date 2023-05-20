import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLArkProps<'input'>

export const CheckboxInput = (props: CheckboxInputProps) => {
  const checkbox = useCheckboxContext()
  const inputProps = mergeProps(() => checkbox().inputProps, props)
  return <ark.input {...inputProps} />
}
