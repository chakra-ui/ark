import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLAtlasProps<'div'>

export const EditableArea = forwardRef<'div'>((props, ref) => {
  const { areaProps } = useEditableContext()
  return <atlas.div {...props} {...areaProps} ref={ref} />
})
