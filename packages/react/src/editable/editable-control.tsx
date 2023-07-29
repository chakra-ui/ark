import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const EditableControl = forwardRef<HTMLDivElement, EditableControlProps>((props, ref) => {
  const { controlProps } = useEditableContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

EditableControl.displayName = 'EditableControl'
