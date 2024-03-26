import { useSliderContext, type UseSliderContext } from './use-slider-context'

export interface SliderContextProps {
  children: (context: UseSliderContext) => React.ReactNode
}

export const SliderContext = (props: SliderContextProps) => props.children(useSliderContext())
