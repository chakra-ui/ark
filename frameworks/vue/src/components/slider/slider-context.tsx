import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseSliderContext, useSliderContext } from './use-slider-context'

export type SliderContextProps = SlotsType<{
  default: UnwrapRef<UseSliderContext>
}>

export const SliderContext = defineComponent(
  (_, { slots }) => {
    const slider = useSliderContext()

    return () => slots.default(slider.value)
  },
  {
    name: 'SliderContext',
    slots: Object as SliderContextProps,
  },
)
