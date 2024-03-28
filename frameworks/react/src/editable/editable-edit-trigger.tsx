import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>(
  (props, ref) => {
    const context = useEditableContext()
    const mergedProps = mergeProps(context.editTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableEditTrigger.displayName = 'EditableEditTrigger'
