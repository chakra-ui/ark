import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = { index: number } & HTMLAtlasProps<'input'>

export const PinInputField = forwardRef<'input', PinInputFieldProps>((props, ref) => {
  const { index, ...rest } = props
  const { getInputProps } = usePinInputContext()
  return <atlas.input ref={ref} {...getInputProps({ index })} {...rest} />
})
