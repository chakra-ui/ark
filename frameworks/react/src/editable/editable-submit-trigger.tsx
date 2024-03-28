import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableSubmitTriggerProps extends HTMLArkProps<'button'> {}

export const EditableSubmitTrigger = forwardRef<HTMLButtonElement, EditableSubmitTriggerProps>(
  (props, ref) => {
    const context = useEditableContext()
    const mergedProps = mergeProps(context.submitTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableSubmitTrigger.displayName = 'EditableSubmitTrigger'
