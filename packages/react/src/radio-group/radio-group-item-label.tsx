import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioContext } from './radio-group-item-context'

export type RadioLabelProps = HTMLAtlasProps<'span'>

export const RadioLabel = forwardRef<'span', RadioLabelProps>((props, ref) => {
  const { getItemLabelProps } = useRadioGroupContext()
  const context = useRadioContext()
  return <atlas.span {...props} {...getItemLabelProps(context)} ref={ref} />
})
