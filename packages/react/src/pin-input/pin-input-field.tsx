import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = { index: number } & HTMLArkProps<'input'>

export const PinInputField = forwardRef<'input', PinInputFieldProps>((props, ref) => {
  const { index, ...inputProps } = props
  const { getInputProps } = usePinInputContext()
  const mergedProps = mergeProps(getInputProps({ index }), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
