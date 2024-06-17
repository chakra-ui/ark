import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseSliderReturn } from './use-slider'
import { SliderProvider } from './use-slider-context'

interface RootProviderProps {
  value: UseSliderReturn
}

export interface SliderRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface SliderRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    SliderRootProviderBaseProps {}

export const SliderRootProvider = (props: SliderRootProviderProps) => {
  const [{ value: slider }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => slider().getRootProps(), localProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} />
    </SliderProvider>
  )
}
