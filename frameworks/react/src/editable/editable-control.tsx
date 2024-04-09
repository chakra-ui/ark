import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableControlProps extends HTMLArkProps<'div'> {}

export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableControl.displayName = 'EditableControl'
