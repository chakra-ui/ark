import { mergeProps } from '@zag-js/react'
import { type ReactElement } from 'react'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = { children: ReactElement }

export const EditableEditTrigger = forwardRef<'button'>((props, ref) => {
  const { editTriggerProps } = useEditableContext()
  const mergedProps = mergeProps(editTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
