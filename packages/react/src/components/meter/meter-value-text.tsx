'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterValueTextBaseProps extends PolymorphicProps {}
export interface MeterValueTextProps extends HTMLProps<'span'>, MeterValueTextBaseProps {}

export const MeterValueText = forwardRef<HTMLSpanElement, MeterValueTextProps>((props, ref) => {
  const { children, ...rest } = props
  const meter = useMeterContext()
  const mergedProps = mergeProps(meter.getValueTextProps(), rest)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || meter.valueAsString}
    </ark.span>
  )
})

MeterValueText.displayName = 'MeterValueText'
