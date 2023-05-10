import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLArkProps<'span'>

export const EditablePreview = forwardRef<'span'>((props, ref) => {
  const { previewProps } = useEditableContext()
  const mergedProps = mergeProps(previewProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
