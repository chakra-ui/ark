'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import type { RootState } from '@zag-js/editable'

export interface EditablePreviewState extends RootState {}

export interface EditablePreviewBaseProps extends PolymorphicProps<EditablePreviewState> {}
export interface EditablePreviewProps extends HTMLProps<'span'>, EditablePreviewBaseProps {}

export const EditablePreview = forwardRef<HTMLSpanElement, EditablePreviewProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getPreviewProps(), props)

  return <ark.span {...mergedProps} ref={ref} state={editable.getRootState()} />
})

EditablePreview.displayName = 'EditablePreview'
