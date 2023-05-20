import { mergeProps } from '@zag-js/react'
import { type ReactElement } from 'react'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = { children: ReactElement }

export const EditableCancelTrigger = forwardRef<'button'>((props, ref) => {
  const { cancelTriggerProps } = useEditableContext()
  const mergedProps = mergeProps(cancelTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
