import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>(
  (props, ref) => {
    const api = useEditableContext()
    const mergedProps = mergeProps(api.editTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableEditTrigger.displayName = 'EditableEditTrigger'
