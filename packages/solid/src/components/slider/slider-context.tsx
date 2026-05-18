import type { JSX } from 'solid-js'
import { type UseSliderContext, useSliderContext } from './use-slider-context.ts'

export interface SliderContextProps {
  children: (context: UseSliderContext) => JSX.Element
}

export const SliderContext = (props: SliderContextProps) => props.children(useSliderContext())
