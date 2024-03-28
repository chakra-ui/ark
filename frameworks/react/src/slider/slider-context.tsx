import type { ReactNode } from 'react'
import { useSliderContext, type UseSliderContext } from './use-slider-context'

export interface SliderContextProps {
  children: (context: UseSliderContext) => ReactNode
}

export const SliderContext = (props: SliderContextProps) => props.children(useSliderContext())
