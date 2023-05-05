import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HTMLArkProps<'div'>

export const EditableControl = forwardRef<'div'>((props, ref) => {
  const { controlProps } = useEditableContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
