import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableSubmitTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const EditableSubmitTrigger = forwardRef<HTMLButtonElement, EditableSubmitTriggerProps>(
  (props, ref) => {
    const { submitTriggerProps } = useEditableContext()
    const mergedProps = mergeProps(submitTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableSubmitTrigger.displayName = 'EditableSubmitTrigger'
