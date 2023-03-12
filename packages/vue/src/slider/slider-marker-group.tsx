import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderMarkerGroupProps = HTMLArkProps<'div'>

export const SliderMarkerGroup: ComponentWithProps<SliderMarkerGroupProps> = defineComponent({
  name: 'SliderMarkerGroup',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.markerGroupProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
