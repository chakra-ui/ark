import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableSubmitTriggerProps extends HTMLArkProps<'button'> {}

export const EditableSubmitTrigger = forwardRef<HTMLButtonElement, EditableSubmitTriggerProps>(
  (props, ref) => {
    const api = useEditableContext()
    const mergedProps = mergeProps(api.submitTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableSubmitTrigger.displayName = 'EditableSubmitTrigger'
