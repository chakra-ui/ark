import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseAngleSliderReturn } from './use-angle-slider'
import { AngleSliderProvider } from './use-angle-slider-context'

interface RootProviderProps {
  value: UseAngleSliderReturn
}

export interface AngleSliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AngleSliderRootProviderProps extends HTMLProps<'div'>, AngleSliderRootProviderBaseProps {}

export const AngleSliderRootProvider = forwardRef<HTMLDivElement, AngleSliderRootProviderProps>((props, ref) => {
  const [{ value: angleSlider }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(angleSlider.getRootProps(), localProps)

  return (
    <AngleSliderProvider value={angleSlider}>
      <ark.div {...mergedProps} ref={ref} />
    </AngleSliderProvider>
  )
})

AngleSliderRootProvider.displayName = 'AngleSliderRootProvider'
