import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLArkProps<'input'>

export const NumberInputField = forwardRef<'input'>((props, ref) => {
  const { inputProps } = useNumberInputContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
