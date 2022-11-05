import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableInputProps = HTMLAtlasProps<'input'>

export const EditableInput = forwardRef<'input', EditableInputProps>((props, ref) => {
  const { inputProps } = useEditableContext()
  const mergedProps = mergeProps(inputProps, props)

  return <atlas.input {...mergedProps} ref={ref} />
})
