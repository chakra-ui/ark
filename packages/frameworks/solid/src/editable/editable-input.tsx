import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableInputProps extends HTMLArkProps<'input'> {}

export const EditableInput = (props: EditableInputProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(() => editable().inputProps, props)

  return <ark.input {...mergedProps} />
}
