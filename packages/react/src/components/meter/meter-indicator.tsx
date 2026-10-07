'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterIndicatorBaseProps extends PolymorphicProps {}
export interface MeterIndicatorProps extends HTMLProps<'div'>, MeterIndicatorBaseProps {}

export const MeterIndicator = forwardRef<HTMLDivElement, MeterIndicatorProps>((props, ref) => {
  const meter = useMeterContext()
  const mergedProps = mergeProps(meter.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MeterIndicator.displayName = 'MeterIndicator'
