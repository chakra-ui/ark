import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLArkProps<'input'>

export const NumberInputField = forwardRef<'input', NumberInputFieldProps>((props, ref) => {
  const { inputProps } = useNumberInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
