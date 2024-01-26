import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableControlProps extends HTMLArkProps<'div'> {}

export const EditableControl: ArkComponent<'div'> = (props: EditableControlProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
