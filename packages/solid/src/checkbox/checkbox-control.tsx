import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxControlProps = HTMLArkProps<'div'>

export const CheckboxControl = (props: CheckboxControlProps) => {
  const checkbox = useCheckboxContext()
  const controlProps = mergeProps(() => checkbox().controlProps, props)
  return <ark.div {...controlProps} />
}
