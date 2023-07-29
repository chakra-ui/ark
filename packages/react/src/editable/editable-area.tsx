import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = ComponentPropsWithoutRef<typeof ark.div>

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const { areaProps } = useEditableContext()
  const mergedProps = mergeProps(areaProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
