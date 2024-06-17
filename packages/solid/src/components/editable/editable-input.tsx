import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableInputBaseProps extends PolymorphicProps<'input'> {}
export interface EditableInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    EditableInputBaseProps {}

export const EditableInput = (props: EditableInputProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
