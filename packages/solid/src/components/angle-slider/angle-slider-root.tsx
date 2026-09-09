import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseAngleSliderProps, useAngleSlider } from './use-angle-slider.ts'
import { AngleSliderProvider } from './use-angle-slider-context.ts'
import type { RootState } from '@zag-js/angle-slider'

export interface AngleSliderRootState extends RootState {}

export interface AngleSliderRootBaseProps extends UseAngleSliderProps, PolymorphicProps<'div', AngleSliderRootState> {}
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
    'aria-label',
    'aria-labelledby',
  ])
  const angleSlider = useAngleSlider(useAngleSliderProps)
  const mergedProps = mergeProps(() => angleSlider().getRootProps(), localProps)

  return (
    <AngleSliderProvider value={angleSlider}>
      <ark.div {...mergedProps} state={angleSlider().getRootState()} />
    </AngleSliderProvider>
  )
}
