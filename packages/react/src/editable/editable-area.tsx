import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLArkProps<'div'>

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const { areaProps } = useEditableContext()
  const mergedProps = mergeProps(areaProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
