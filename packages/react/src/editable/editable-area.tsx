import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HtmlArkProps<'div'>

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const { areaProps } = useEditableContext()
  const mergedProps = mergeProps(areaProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
