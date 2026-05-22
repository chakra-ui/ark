'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableControlBaseProps extends PolymorphicProps {}
export interface EditableControlProps extends HTMLProps<'div'>, EditableControlBaseProps {}

export const EditableControl = ({ ref, ...props }: EditableControlProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

EditableControl.displayName = 'EditableControl'
