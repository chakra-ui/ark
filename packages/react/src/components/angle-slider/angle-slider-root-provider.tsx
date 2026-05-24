'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseAngleSliderReturn } from './use-angle-slider.ts'
import { AngleSliderProvider } from './use-angle-slider-context.ts'

interface RootProviderProps {
  value: UseAngleSliderReturn
}

export interface AngleSliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AngleSliderRootProviderProps extends HTMLProps<'div'>, AngleSliderRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const AngleSliderRootProvider = forwardRef<HTMLDivElement, AngleSliderRootProviderProps>((props, ref) => {
  const [{ value: angleSlider }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(angleSlider.getRootProps(), localProps)

  return (
    <AngleSliderProvider value={angleSlider}>
      <ark.div {...mergedProps} ref={ref} />
    </AngleSliderProvider>
  )
})

AngleSliderRootProvider.displayName = 'AngleSliderRootProvider'
