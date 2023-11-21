import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderMarkerGroupProps = HTMLArkProps<'div'>

export const SliderMarkerGroup = defineComponent({
  name: 'SliderMarkerGroup',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.markerGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
