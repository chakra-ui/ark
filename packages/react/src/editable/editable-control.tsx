import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HTMLArkProps<'div'>

export const EditableControl = forwardRef<'div', EditableControlProps>((props, ref) => {
  const { controlProps } = useEditableContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
