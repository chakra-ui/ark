import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseAngleSliderProps, useAngleSlider } from './use-angle-slider'
import { AngleSliderProvider } from './use-angle-slider-context'

export interface AngleSliderRootBaseProps extends UseAngleSliderProps, PolymorphicProps<'div'> {}
export interface AngleSliderRootProps extends HTMLProps<'div'>, AngleSliderRootBaseProps {}

export const AngleSliderRoot = (props: AngleSliderRootProps) => {
  const [useAngleSliderProps, localProps] = createSplitProps<UseAngleSliderProps>()(props, [
    'id',
    'ids',
    'name',
    'invalid',
    'readOnly',
    'disabled',
    'onValueChangeEnd',
    'onValueChange',
    'defaultValue',
    'value',
    'step',
  ])
  const angleSlider = useAngleSlider(useAngleSliderProps)
  const mergedProps = mergeProps(() => angleSlider().getRootProps(), localProps)

  return (
    <AngleSliderProvider value={angleSlider}>
      <ark.div {...mergedProps} />
    </AngleSliderProvider>
  )
}
