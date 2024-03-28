import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger = forwardRef<HTMLButtonElement, EditableCancelTriggerProps>(
  (props, ref) => {
    const context = useEditableContext()
    const mergedProps = mergeProps(context.cancelTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableCancelTrigger.displayName = 'EditableCancelTrigger'
