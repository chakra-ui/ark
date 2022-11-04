import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioContext } from './radio-group-item-context'

export type RadioControlProps = HTMLAtlasProps<'div'>

export const RadioControl = forwardRef<'div', RadioControlProps>((props, ref) => {
  const { getItemControlProps } = useRadioGroupContext()
  const context = useRadioContext()
  return <atlas.div {...props} {...getItemControlProps(context)} ref={ref} />
})
