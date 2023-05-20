import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HTMLArkProps<'div'>

export const EditableControl = (props: EditableControlProps) => {
  const editable = useEditableContext()
  const controlProps = mergeProps(() => editable().controlProps, props)
  return <ark.div {...controlProps} />
}
