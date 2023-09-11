import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HtmlArkProps<'div'>

export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>((props, ref) => {
  const { controlProps } = useEditableContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableControl.displayName = 'EditableControl'
