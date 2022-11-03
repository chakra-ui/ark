import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableCancelButtonProps = HTMLAtlasProps<'button'>

export const EditableCancelButton = forwardRef<'button', EditableCancelButtonProps>(
  (props, ref) => {
    const { cancelButtonProps } = useEditableContext()
    return <atlas.button {...props} {...cancelButtonProps} ref={ref} />
  },
)
