import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSwitchContext } from './switch-context'

export type SwitchInputProps = HTMLArkProps<'input'>

export const SwitchInput = forwardRef<'input'>((props, ref) => {
  const { inputProps } = useSwitchContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
