import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableInputBaseProps extends PolymorphicProps<'input'> {}
export interface EditableInputProps extends HTMLProps<'input'>, EditableInputBaseProps {}

export const EditableInput = (props: EditableInputProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
