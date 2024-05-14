import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditablePreviewProps extends HTMLArkProps<'span'> {}

export const EditablePreview = forwardRef<HTMLSpanElement, EditablePreviewProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.previewProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

EditablePreview.displayName = 'EditablePreview'
