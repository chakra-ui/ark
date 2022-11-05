import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'
export type EditableEditButtonProps = HTMLAtlasProps<'button'>

export const EditableEditButton = forwardRef<'button', EditableEditButtonProps>((props, ref) => {
  const { editButtonProps } = useEditableContext()
  const mergedProps = mergeProps(editButtonProps, props)

  return <atlas.button {...mergedProps} ref={ref} />
})
