import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export type RadioGroupItemLabelProps = HTMLAtlasProps<'span'>

export const RadioGroupItemLabel = forwardRef<'span', RadioGroupItemLabelProps>((props, ref) => {
  const { getItemLabelProps } = useRadioGroupContext()
  const context = useRadioGroupItemContext()
  return <atlas.span {...props} {...getItemLabelProps(context)} ref={ref} />
})
