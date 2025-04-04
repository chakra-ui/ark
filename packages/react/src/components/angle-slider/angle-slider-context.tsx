import type { ReactNode } from 'react'
import { type UseAngleSliderContext, useAngleSliderContext } from './use-angle-slider-context'

export interface AngleSliderContextProps {
  children: (context: UseAngleSliderContext) => ReactNode
}

export const AngleSliderContext = (props: AngleSliderContextProps) => props.children(useAngleSliderContext())
