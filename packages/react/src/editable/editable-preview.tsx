import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLAtlasProps<'span'>

export const EditablePreview = forwardRef<'span', EditablePreviewProps>((props, ref) => {
  const { previewProps } = useEditableContext()
  const mergedProps = mergeProps(previewProps, props)

  return <atlas.span {...mergedProps} ref={ref} />
})
