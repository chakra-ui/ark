import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditablePreviewBaseProps extends PolymorphicProps {}
export interface EditablePreviewProps
  extends HTMLAttributes<HTMLSpanElement>,
    EditablePreviewBaseProps {}

export const EditablePreview = forwardRef<HTMLSpanElement, EditablePreviewProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getPreviewProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

EditablePreview.displayName = 'EditablePreview'
