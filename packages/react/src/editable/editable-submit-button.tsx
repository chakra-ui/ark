import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableSubmitButtonProps = HTMLArkProps<'button'>

export const EditableSubmitButton = forwardRef<'button', EditableSubmitButtonProps>(
  (props, ref) => {
    const { submitButtonProps } = useEditableContext()
    const mergedProps = mergeProps(submitButtonProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)
