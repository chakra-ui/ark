import { forwardRef } from '@polymorphic-factory/react'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { EditableContext, useEditableContext } from './editable-context'

export type EditableControlsProps = Omit<HTMLArkProps<'div'>, 'children'> & {
  children: (context: EditableContext) => ReactNode
}

export const EditableControls = forwardRef<'div', EditableControlsProps>((props, ref) => {
  const { children, ...divProps } = props
  const api = useEditableContext()

  return (
    <ark.div {...divProps} ref={ref}>
      {children(api)}
    </ark.div>
  )
})
