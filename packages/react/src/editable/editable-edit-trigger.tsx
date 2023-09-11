import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = HtmlArkProps<'button'>

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>(
  (props, ref) => {
    const { editTriggerProps } = useEditableContext()
    const mergedProps = mergeProps(editTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

EditableEditTrigger.displayName = 'EditableEditTrigger'
