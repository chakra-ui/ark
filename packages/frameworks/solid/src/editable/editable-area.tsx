import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableAreaProps extends HTMLArkProps<'div'> {}

export const EditableArea = (props: EditableAreaProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(() => editable().areaProps, props)

  return <ark.div {...mergedProps} />
}
