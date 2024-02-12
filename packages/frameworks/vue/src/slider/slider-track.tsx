import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderTrackProps extends HTMLArkProps<'div'> {}

export const SliderTrack = defineComponent<SliderTrackProps>(
  (_, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.trackProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SliderTrack',
  },
)
