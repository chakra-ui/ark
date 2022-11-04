import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioContext } from './radio-group-item-context'

export type RadioInputProps = HTMLAtlasProps<'input'>

export const RadioInput = forwardRef<'input', RadioInputProps>((props, ref) => {
  const { getItemInputProps } = useRadioGroupContext()
  const context = useRadioContext()
  return <atlas.input {...props} {...getItemInputProps(context)} ref={ref} />
})
