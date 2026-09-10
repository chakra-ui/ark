'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseAngleSliderReturn } from './use-angle-slider.ts'
import { AngleSliderProvider } from './use-angle-slider-context.ts'
import type { RootState } from '@zag-js/angle-slider'

interface RootProviderProps {
  value: UseAngleSliderReturn
}

export interface AngleSliderRootProviderState extends RootState {}

export interface AngleSliderRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<AngleSliderRootProviderState> {}
export interface AngleSliderRootProviderProps extends HTMLProps<'div'>, AngleSliderRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const AngleSliderRootProvider = forwardRef<HTMLDivElement, AngleSliderRootProviderProps>((props, ref) => {
  const [{ value: angleSlider }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(angleSlider.getRootProps(), localProps)

  return (
    <AngleSliderProvider value={angleSlider}>
      <ark.div {...mergedProps} ref={ref} state={angleSlider.getRootState()} />
    </AngleSliderProvider>
  )
})

AngleSliderRootProvider.displayName = 'AngleSliderRootProvider'
