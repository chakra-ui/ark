'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseSliderReturn } from './use-slider.ts'
import { SliderProvider } from './use-slider-context.ts'
import type { RootState } from '@zag-js/slider'

interface RootProviderProps {
  value: UseSliderReturn
}

export interface SliderRootProviderState extends RootState {}

export interface SliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps<SliderRootProviderState> {}
export interface SliderRootProviderProps extends HTMLProps<'div'>, SliderRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SliderRootProvider = forwardRef<HTMLDivElement, SliderRootProviderProps>((props, ref) => {
  const [{ value: slider }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(slider.getRootProps(), localProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} ref={ref} state={slider.getRootState()} />
    </SliderProvider>
  )
})

SliderRootProvider.displayName = 'SliderRootProvider'
