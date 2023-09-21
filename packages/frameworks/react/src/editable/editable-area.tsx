import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableAreaProps extends HTMLArkProps<'div'> {}

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const api = useEditableContext()
  const mergedProps = mergeProps(api.areaProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
