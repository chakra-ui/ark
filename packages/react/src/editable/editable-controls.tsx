import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlsProps = HTMLArkProps<'div'>

export const EditableControls = forwardRef<'div', EditableControlsProps>((props, ref) => {
  const { controlGroupProps } = useEditableContext()
  const mergedProps = mergeProps(controlGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
