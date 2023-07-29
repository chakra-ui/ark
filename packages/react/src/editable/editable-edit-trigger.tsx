import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>(
  (props, ref) => {
    const { editTriggerProps } = useEditableContext()
    const mergedProps = mergeProps(editTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableEditTrigger.displayName = 'EditableEditTrigger'
