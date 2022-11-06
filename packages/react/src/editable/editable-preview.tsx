import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLArkProps<'span'>

export const EditablePreview = forwardRef<'span', EditablePreviewProps>((props, ref) => {
  const { previewProps } = useEditableContext()
  const mergedProps = mergeProps(previewProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
