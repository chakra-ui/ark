import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableControlProps extends HTMLArkProps<'div'> {}

export const EditableControl = (props: EditableControlProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps()} />
}
