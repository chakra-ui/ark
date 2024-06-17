import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditablePreviewBaseProps extends PolymorphicProps<'span'> {}
export interface EditablePreviewProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    EditablePreviewBaseProps {}

export const EditablePreview = (props: EditablePreviewProps) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(() => api().getPreviewProps(), props)

  return <ark.span {...mergedProps} />
}
