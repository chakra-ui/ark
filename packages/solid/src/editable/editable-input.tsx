import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLArkProps<'input'>

export const EditableInput = (props: EditableInputProps) => {
  const editable = useEditableContext()
  const inputProps = mergeProps(() => editable().inputProps, props)
  return <ark.input {...inputProps} />
}
