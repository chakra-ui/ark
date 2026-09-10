import type { RootState } from '@zag-js/slider'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseSliderReturn } from './use-slider.ts'
import { SliderProvider } from './use-slider-context.ts'

interface RootProviderProps {
  value: UseSliderReturn
}

export interface SliderRootProviderState extends RootState {}

export interface SliderRootProviderBaseProps extends PolymorphicProps<'div', SliderRootProviderState> {}
export interface SliderRootProviderProps extends HTMLProps<'div'>, RootProviderProps, SliderRootProviderBaseProps {}

export const SliderRootProvider = (props: SliderRootProviderProps) => {
  const [{ value: slider }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => slider().getRootProps(), localProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} state={slider().getRootState()} />
    </SliderProvider>
  )
}
