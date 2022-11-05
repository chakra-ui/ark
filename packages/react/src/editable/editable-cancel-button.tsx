import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableCancelButtonProps = HTMLAtlasProps<'button'>

export const EditableCancelButton = forwardRef<'button', EditableCancelButtonProps>(
  (props, ref) => {
    const { cancelButtonProps } = useEditableContext()
    const mergedProps = mergeProps(cancelButtonProps, props)

    return <atlas.button {...mergedProps} ref={ref} />
  },
)
