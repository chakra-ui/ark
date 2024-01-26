import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableInputProps extends HTMLArkProps<'input'> {}

export const EditableInput: ArkComponent<'input'> = (props) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().inputProps, props)

  return <ark.input {...mergedProps} />
}
