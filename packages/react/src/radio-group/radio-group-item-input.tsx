import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export type RadioGroupItemInputProps = HTMLAtlasProps<'input'>

export const RadioGroupItemInput = forwardRef<'input', RadioGroupItemInputProps>((props, ref) => {
  const { getItemInputProps } = useRadioGroupContext()
  const context = useRadioGroupItemContext()
  return <atlas.input {...props} {...getItemInputProps(context)} ref={ref} />
})
