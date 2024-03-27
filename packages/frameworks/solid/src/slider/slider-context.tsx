import type { JSX } from 'solid-js'
import { useSliderContext, type UseSliderContext } from './use-slider-context'

export interface SliderContextProps {
  children: (context: UseSliderContext) => JSX.Element
}

export const SliderContext = (props: SliderContextProps) => props.children(useSliderContext())
