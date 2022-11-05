import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLAtlasProps<'div'>

export const EditableArea = forwardRef<'div', EditableAreaProps>((props, ref) => {
  const { areaProps } = useEditableContext()
  const mergedProps = mergeProps(areaProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
