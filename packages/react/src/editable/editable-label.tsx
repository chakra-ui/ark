import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditableLabelProps = HTMLArkProps<'label'>

export const EditableLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useEditableContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
