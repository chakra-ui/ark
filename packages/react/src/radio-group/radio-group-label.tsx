import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLAtlasProps<'label'>

export const RadioGroupLabel = forwardRef<'label', RadioGroupLabelProps>((props, ref) => {
  const api = useRadioGroupContext()
  return <atlas.label {...api.labelProps} {...props} ref={ref} />
})
