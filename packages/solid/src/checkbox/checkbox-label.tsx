import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxLabelProps = HTMLArkProps<'span'>

export const CheckboxLabel = (props: CheckboxLabelProps) => {
  const checkbox = useCheckboxContext()
  const labelProps = mergeProps(() => checkbox().labelProps, props)
  return <ark.span {...labelProps} />
}
