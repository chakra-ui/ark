import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack = defineComponent({
  name: 'SliderTrack',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.trackProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
