import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, ark } from '../factory'
import { type UseAngleSliderProps, useAngleSlider } from './use-angle-slider'
import { AngleSliderProvider } from './use-angle-slider-context'

export interface AngleSliderRootProps extends Assign<HTMLProps<'div'>, UseAngleSliderProps> {}
export const AngleSliderRoot = forwardRef<HTMLDivElement, AngleSliderRootProps>((props, ref) => {
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
  const mergedProps = mergeProps(angleSlider.getRootProps(), localProps)

  return (
    <AngleSliderProvider value={angleSlider}>
      <ark.div {...mergedProps} ref={ref} />
    </AngleSliderProvider>
  )
})

AngleSliderRoot.displayName = 'AngleSliderRoot'
