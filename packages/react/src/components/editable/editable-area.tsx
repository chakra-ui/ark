'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableAreaBaseProps extends PolymorphicProps {}
export interface EditableAreaProps extends HTMLProps<'div'>, EditableAreaBaseProps {}

export const EditableArea = ({ ref, ...props }: EditableAreaProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

EditableArea.displayName = 'EditableArea'
