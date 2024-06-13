import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export type EditableCancelTriggerBaseProps = {}
export interface EditableCancelTriggerProps
  extends HTMLArkProps<'button'>,
    EditableCancelTriggerBaseProps {}

export const EditableCancelTrigger = forwardRef<HTMLButtonElement, EditableCancelTriggerProps>(
  (props, ref) => {
    const editable = useEditableContext()
    const mergedProps = mergeProps(editable.getCancelTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableCancelTrigger.displayName = 'EditableCancelTrigger'
