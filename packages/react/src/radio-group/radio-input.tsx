import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioInputProps = HTMLArkProps<'input'>

export const RadioInput = forwardRef<'input'>((props, ref) => {
  const { getRadioInputProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioInputProps(context), props)

  return <ark.input {...mergedProps} ref={ref} />
})
