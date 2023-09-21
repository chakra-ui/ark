import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableControlProps extends HTMLArkProps<'div'> {}

export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>((props, ref) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableControl.displayName = 'EditableControl'
