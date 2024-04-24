import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableAreaProps extends HTMLArkProps<'div'> {}

export const EditableArea = (props: EditableAreaProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().areaProps, props)

  return <ark.div {...mergedProps} />
}
