import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useEditableContext } from './editable-context'

export type EditableCancelButtonProps = HTMLAtlasProps<'button'>

export const EditableCancelButton = forwardRef<'button'>((props, ref) => {
  const { cancelButtonProps } = useEditableContext()
  return <atlas.button {...props} {...cancelButtonProps} ref={ref} />
})
