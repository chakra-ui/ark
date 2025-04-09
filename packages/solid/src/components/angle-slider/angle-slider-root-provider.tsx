import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseAngleSliderReturn } from './use-angle-slider'
import { AngleSliderProvider } from './use-angle-slider-context'

interface RootProviderProps {
  value: UseAngleSliderReturn
}

export interface AngleSliderRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
export interface AngleSliderRootProviderProps extends HTMLProps<'div'>, AngleSliderRootProviderBaseProps {}

export const AngleSliderRootProvider = (props: AngleSliderRootProviderProps) => {
  const [rootProps, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => rootProps.value().getRootProps(), localProps)

  return (
    <AngleSliderProvider value={rootProps.value}>
      <ark.div {...mergedProps} />
    </AngleSliderProvider>
  )
}
