import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxInputProps = HTMLArkProps<'input'>

export const CheckboxInput = forwardRef<'input'>((props, ref) => {
  const { inputProps } = useCheckboxContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
