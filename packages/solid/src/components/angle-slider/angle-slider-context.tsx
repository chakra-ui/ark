import type { JSX } from 'solid-js'
import { type UseAngleSliderContext, useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderContextProps {
  children: (context: UseAngleSliderContext) => JSX.Element
}

export const AngleSliderContext = (props: AngleSliderContextProps) => props.children(useAngleSliderContext())
