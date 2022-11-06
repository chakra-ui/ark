import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'
export type EditableEditButtonProps = HTMLArkProps<'button'>

export const EditableEditButton = forwardRef<'button', EditableEditButtonProps>((props, ref) => {
  const { editButtonProps } = useEditableContext()
  const mergedProps = mergeProps(editButtonProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
