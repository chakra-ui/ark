import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>(
  (props, ref) => {
    const editable = useEditableContext()
    const mergedProps = mergeProps(editable.getEditTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableEditTrigger.displayName = 'EditableEditTrigger'
