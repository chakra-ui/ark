import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableAreaProps extends HTMLArkProps<'div'> {}

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
