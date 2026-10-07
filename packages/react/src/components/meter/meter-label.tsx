'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterLabelBaseProps extends PolymorphicProps {}
export interface MeterLabelProps extends HTMLProps<'span'>, MeterLabelBaseProps {}

export const MeterLabel = forwardRef<HTMLSpanElement, MeterLabelProps>((props, ref) => {
  const meter = useMeterContext()
  const mergedProps = mergeProps(meter.getLabelProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

MeterLabel.displayName = 'MeterLabel'
