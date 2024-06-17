import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableControlBaseProps extends PolymorphicProps<'div'> {}
export interface EditableControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    EditableControlBaseProps {}

export const EditableControl = (props: EditableControlProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
