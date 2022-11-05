import { forwardRef } from '@polymorphic-factory/react'
import type { ReactNode } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { EditableContext, useEditableContext } from './editable-context'

export type EditableControlsProps = Omit<HTMLAtlasProps<'div'>, 'children'> & {
  children: (context: EditableContext) => ReactNode
}

export const EditableControls = forwardRef<'div', EditableControlsProps>((props, ref) => {
  const { children, ...divProps } = props
  const api = useEditableContext()

  return (
    <atlas.div {...divProps} ref={ref}>
      {children(api)}
    </atlas.div>
  )
})
