import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useEditableContext } from './editable-context'

export type EditableEditButtonProps = HTMLAtlasProps<'button'>

export const EditableEditButton = forwardRef<'button'>((props, ref) => {
  const { editButtonProps } = useEditableContext()
  return <atlas.button {...props} {...editButtonProps} ref={ref} />
})
