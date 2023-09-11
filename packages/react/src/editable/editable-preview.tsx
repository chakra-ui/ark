import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HtmlArkProps<'span'>

export const EditablePreview = forwardRef<HTMLSpanElement, EditablePreviewProps>((props, ref) => {
  const { previewProps } = useEditableContext()
  const mergedProps = mergeProps(previewProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

EditablePreview.displayName = 'EditablePreview'
