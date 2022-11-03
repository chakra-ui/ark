import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export type RadioGroupItemControlProps = HTMLAtlasProps<'div'>

export const RadioGroupItemControl = forwardRef<'div', RadioGroupItemControlProps>((props, ref) => {
  const { getItemControlProps } = useRadioGroupContext()
  const context = useRadioGroupItemContext()
  return <atlas.div {...props} {...getItemControlProps(context)} ref={ref} />
})
