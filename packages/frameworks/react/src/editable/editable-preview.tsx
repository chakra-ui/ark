import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditablePreviewProps extends HTMLArkProps<'span'> {}

export const EditablePreview = forwardRef<HTMLSpanElement, EditablePreviewProps>((props, ref) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(api.previewProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

EditablePreview.displayName = 'EditablePreview'
