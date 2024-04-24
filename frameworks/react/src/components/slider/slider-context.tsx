import type { ReactNode } from 'react'
import { type UseSliderContext, useSliderContext } from './use-slider-context'

export interface SliderContextProps {
  children: (context: UseSliderContext) => ReactNode
}

export const SliderContext = (props: SliderContextProps) => props.children(useSliderContext())
