import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableInputProps extends HTMLArkProps<'input'> {}

export const EditableInput = (props: EditableInputProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().inputProps, props)

  return <ark.input {...mergedProps} />
}
