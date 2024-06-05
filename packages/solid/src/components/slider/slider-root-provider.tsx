import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseSliderReturn } from './use-slider'
import { SliderProvider } from './use-slider-context'

interface RootProviderProps {
  value: UseSliderReturn
}

export interface SliderRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const SliderRootProvider = (props: SliderRootProviderProps) => {
  const [{ value: slider }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => slider().rootProps, localProps)

  return (
    <SliderProvider value={slider}>
      <ark.div {...mergedProps} />
    </SliderProvider>
  )
}
