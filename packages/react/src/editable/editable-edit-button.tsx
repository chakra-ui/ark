import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableEditButtonProps = HTMLAtlasProps<'button'>

export const EditableEditButton = forwardRef<'button', EditableEditButtonProps>((props, ref) => {
  const { editButtonProps } = useEditableContext()
  return <atlas.button {...props} {...editButtonProps} ref={ref} />
})
