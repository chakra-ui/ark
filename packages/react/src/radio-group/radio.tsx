import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import type { Assign } from '../types'
import { RadioProvider, type RadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioProps = Assign<ComponentPropsWithoutRef<typeof ark.label>, RadioContext>

export const Radio = forwardRef<HTMLLabelElement, RadioProps>((props, ref) => {
  const { value, disabled, invalid, readOnly, ...divProps } = props
  const { getRadioProps } = useRadioGroupContext()
  const mergedProps = mergeProps(getRadioProps({ value, disabled }), divProps)

  return (
    <RadioProvider value={{ value, disabled, invalid, readOnly }}>
      <ark.label {...mergedProps} ref={ref} />
    </RadioProvider>
  )
})

Radio.displayName = 'Radio'
