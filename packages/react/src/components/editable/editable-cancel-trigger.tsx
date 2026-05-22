'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableCancelTriggerBaseProps extends PolymorphicProps {}
export interface EditableCancelTriggerProps extends HTMLProps<'button'>, EditableCancelTriggerBaseProps {}

export const EditableCancelTrigger = ({ ref, ...props }: EditableCancelTriggerProps) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getCancelTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

EditableCancelTrigger.displayName = 'EditableCancelTrigger'
