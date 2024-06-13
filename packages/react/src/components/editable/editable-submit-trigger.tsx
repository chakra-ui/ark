import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export type EditableSubmitTriggerBaseProps = {}
export interface EditableSubmitTriggerProps
  extends HTMLArkProps<'button'>,
    EditableSubmitTriggerBaseProps {}

export const EditableSubmitTrigger = forwardRef<HTMLButtonElement, EditableSubmitTriggerProps>(
  (props, ref) => {
    const editable = useEditableContext()
    const mergedProps = mergeProps(editable.getSubmitTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableSubmitTrigger.displayName = 'EditableSubmitTrigger'
