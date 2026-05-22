'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditablePreviewBaseProps extends PolymorphicProps {}
export interface EditablePreviewProps extends HTMLProps<'span'>, EditablePreviewBaseProps {}

export const EditablePreview = ({ ref, ...props }: EditablePreviewProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getPreviewProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
}

EditablePreview.displayName = 'EditablePreview'
