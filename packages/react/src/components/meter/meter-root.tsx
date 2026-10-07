'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseMeterProps, useMeter } from './use-meter.ts'
import { MeterProvider } from './use-meter-context.ts'

export interface MeterRootBaseProps extends UseMeterProps, PolymorphicProps {}
export interface MeterRootProps extends Assign<HTMLProps<'div'>, MeterRootBaseProps> {}

const splitRootProps = createSplitProps<UseMeterProps>()

export const MeterRoot = forwardRef<HTMLDivElement, MeterRootProps>((props, ref) => {
  const [meterProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'formatOptions',
    'high',
    'id',
    'ids',
    'locale',
    'low',
    'max',
    'min',
    'onValueChange',
    'optimum',
    'orientation',
    'translations',
    'value',
  ])
  const meter = useMeter(meterProps)
  const mergedProps = mergeProps(meter.getRootProps(), localProps)

  return (
    <MeterProvider value={meter}>
      <ark.div {...mergedProps} ref={ref} />
    </MeterProvider>
  )
})

MeterRoot.displayName = 'MeterRoot'
