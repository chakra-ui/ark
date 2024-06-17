import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableAreaBaseProps extends PolymorphicProps {}
export interface EditableAreaProps extends HTMLAttributes<HTMLDivElement>, EditableAreaBaseProps {}

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
