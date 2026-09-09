import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseAngleSliderReturn } from './use-angle-slider.ts'
import { AngleSliderProvider } from './use-angle-slider-context.ts'
import type { RootState } from '@zag-js/angle-slider'

interface RootProviderProps {
  value: UseAngleSliderReturn
}

export interface AngleSliderRootProviderState extends RootState {}

export interface AngleSliderRootProviderBaseProps
  extends RootProviderProps, PolymorphicProps<'div', AngleSliderRootProviderState> {}
export interface AngleSliderRootProviderProps extends HTMLProps<'div'>, AngleSliderRootProviderBaseProps {}

export const AngleSliderRootProvider = (props: AngleSliderRootProviderProps) => {
  const [rootProps, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => rootProps.value().getRootProps(), localProps)

  return (
    <AngleSliderProvider value={rootProps.value}>
      <ark.div {...mergedProps} state={rootProps.value().getRootState()} />
    </AngleSliderProvider>
  )
}
