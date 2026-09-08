'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import type { LabelState } from '@zag-js/editable'

export interface EditableLabelState extends LabelState {}

export interface EditableLabelBaseProps extends PolymorphicProps<EditableLabelState> {}
export interface EditableLabelProps extends HTMLProps<'label'>, EditableLabelBaseProps {}

export const EditableLabel = forwardRef<HTMLLabelElement, EditableLabelProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} state={editable.getLabelState()} />
})

EditableLabel.displayName = 'EditableLabel'
