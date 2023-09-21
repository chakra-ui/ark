import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger = forwardRef<HTMLButtonElement, EditableCancelTriggerProps>(
  (props, ref) => {
    const api = useEditableContext()
    const mergedProps = mergeProps(api.cancelTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableCancelTrigger.displayName = 'EditableCancelTrigger'
