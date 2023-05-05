import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { RadioProvider, type RadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioProps = Assign<HTMLArkProps<'label'>, RadioContext>

export const Radio = forwardRef<'label', RadioContext>((props, ref) => {
  const { value, disabled, invalid, readOnly, ...divProps } = props
  const { getRadioProps } = useRadioGroupContext()
  const mergedProps = mergeProps(getRadioProps({ value, disabled }), divProps)

  return (
    <RadioProvider value={{ value, disabled, invalid, readOnly }}>
      <ark.label {...mergedProps} ref={ref} />
    </RadioProvider>
  )
})
