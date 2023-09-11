import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableSubmitTriggerProps = HTMLArkProps<'button'>

export const EditableSubmitTrigger = forwardRef<HTMLButtonElement, EditableSubmitTriggerProps>(
  (props, ref) => {
    const { submitTriggerProps } = useEditableContext()
    const mergedProps = mergeProps(submitTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableSubmitTrigger.displayName = 'EditableSubmitTrigger'
