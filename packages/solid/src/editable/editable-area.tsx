import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLArkProps<'div'>

export const EditableArea = (props: EditableAreaProps) => {
  const editable = useEditableContext()
  const areaProps = mergeProps(() => editable().areaProps, props)
  return <ark.div {...areaProps} />
}
