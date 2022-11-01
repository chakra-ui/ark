import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = { index: number } & HTMLAtlasProps<'input'>

export const PinInputField = forwardRef<'input', PinInputFieldProps>((props, ref) => {
  const { index, ...rest } = props
  const { getInputProps } = usePinInputContext()
  return <atlas.input ref={ref} {...getInputProps({ index })} {...rest} />
})
