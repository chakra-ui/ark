'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableLabelBaseProps extends PolymorphicProps {}
export interface EditableLabelProps extends HTMLProps<'label'>, EditableLabelBaseProps {}

export const EditableLabel = ({ ref, ...props }: EditableLabelProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
}

EditableLabel.displayName = 'EditableLabel'
