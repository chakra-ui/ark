import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableAreaProps extends HTMLArkProps<'div'> {}

export const EditableArea: ArkComponent<'div'> = (props) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().areaProps, props)

  return <ark.div {...mergedProps} />
}
