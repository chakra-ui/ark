import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseSliderReturn } from './use-slider'
import { SliderProvider } from './use-slider-context'

interface RootProviderProps {
  value: UseSliderReturn
}

export interface SliderRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const SliderRootProvider = forwardRef<HTMLDivElement, SliderRootProviderProps>(
  (props, ref) => {
    const [{ value: slider }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
    const mergedProps = mergeProps(slider.getRootProps(), localProps)

    return (
      <SliderProvider value={slider}>
        <ark.div {...mergedProps} ref={ref} />
      </SliderProvider>
    )
  },
)

SliderRootProvider.displayName = 'SliderRootProvider'
