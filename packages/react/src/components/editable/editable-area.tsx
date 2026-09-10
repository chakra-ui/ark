'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import type { AreaState } from '@zag-js/editable'

export interface EditableAreaState extends AreaState {}

export interface EditableAreaBaseProps extends PolymorphicProps<EditableAreaState> {}
export interface EditableAreaProps extends HTMLProps<'div'>, EditableAreaBaseProps {}

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={editable.getAreaState()} />
})

EditableArea.displayName = 'EditableArea'
