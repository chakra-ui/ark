import { mergeProps } from '@zag-js/react'
import { type ReactElement } from 'react'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditableSubmitTriggerProps = { children: ReactElement }

export const EditableSubmitTrigger = forwardRef<'button'>((props, ref) => {
  const { submitTriggerProps } = useEditableContext()
  const mergedProps = mergeProps(submitTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
