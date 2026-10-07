'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseMeterReturn } from './use-meter.ts'
import { MeterProvider } from './use-meter-context.ts'

interface RootProviderProps {
  value: UseMeterReturn
}

export interface MeterRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MeterRootProviderProps extends HTMLProps<'div'>, MeterRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const MeterRootProvider = forwardRef<HTMLDivElement, MeterRootProviderProps>((props, ref) => {
  const [{ value: meter }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(meter.getRootProps(), localProps)

  return (
    <MeterProvider value={meter}>
      <ark.div {...mergedProps} ref={ref} />
    </MeterProvider>
  )
})

MeterRootProvider.displayName = 'MeterRootProvider'
