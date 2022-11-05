import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = { index: number } & HTMLAtlasProps<'input'>

export const PinInputField = forwardRef<'input', PinInputFieldProps>((props, ref) => {
  const { index, ...inputProps } = props
  const { getInputProps } = usePinInputContext()
  const mergedProps = mergeProps(getInputProps({ index }), inputProps)

  return <atlas.input {...mergedProps} ref={ref} />
})
