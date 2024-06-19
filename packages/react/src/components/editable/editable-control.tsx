import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableControlBaseProps extends PolymorphicProps {}
export interface EditableControlProps extends HTMLProps<'div'>, EditableControlBaseProps {}

export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableControl.displayName = 'EditableControl'
