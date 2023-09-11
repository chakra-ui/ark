import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = HtmlArkProps<'button'>

export const EditableCancelTrigger = forwardRef<HTMLButtonElement, EditableCancelTriggerProps>(
  (props, ref) => {
    const { cancelTriggerProps } = useEditableContext()
    const mergedProps = mergeProps(cancelTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableCancelTrigger.displayName = 'EditableCancelTrigger'
