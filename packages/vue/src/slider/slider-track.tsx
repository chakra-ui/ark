import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderTrackProps = HTMLArkProps<'div'>

export const SliderTrack: ComponentWithProps<SliderTrackProps> = defineComponent({
  name: 'SliderTrack',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.trackProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
