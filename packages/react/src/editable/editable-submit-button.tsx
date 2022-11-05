import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableSubmitButtonProps = HTMLAtlasProps<'button'>

export const EditableSubmitButton = forwardRef<'button', EditableSubmitButtonProps>(
  (props, ref) => {
    const { submitButtonProps } = useEditableContext()
    const mergedProps = mergeProps(submitButtonProps, props)

    return <atlas.button {...mergedProps} ref={ref} />
  },
)
