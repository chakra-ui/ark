import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLAtlasProps<'span'>

export const EditablePreview = forwardRef<'span'>((props, ref) => {
  const { previewProps } = useEditableContext()
  return <atlas.span {...props} {...previewProps} ref={ref} />
})
