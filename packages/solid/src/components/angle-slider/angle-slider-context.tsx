import type { JSX } from '@solidjs/web'
import { type UseAngleSliderContext, useAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderContextProps {
  children: (context: UseAngleSliderContext) => JSX.Element
}

export const AngleSliderContext = (props: AngleSliderContextProps) => props.children(useAngleSliderContext())
