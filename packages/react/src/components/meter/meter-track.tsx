'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMeterContext } from './use-meter-context.ts'

export interface MeterTrackBaseProps extends PolymorphicProps {}
export interface MeterTrackProps extends HTMLProps<'div'>, MeterTrackBaseProps {}

export const MeterTrack = forwardRef<HTMLDivElement, MeterTrackProps>((props, ref) => {
  const meter = useMeterContext()
  const mergedProps = mergeProps(meter.getTrackProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

MeterTrack.displayName = 'MeterTrack'
