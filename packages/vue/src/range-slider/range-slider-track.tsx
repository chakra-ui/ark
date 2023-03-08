import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = HTMLArkProps<'div'>

export const RangeSliderTrack: ComponentWithProps<RangeSliderTrackProps> = defineComponent({
  name: 'RangeSliderTrack',
  setup(_, { slots, attrs }) {
    const api = useRangeSliderContext()

    return () => (
      <ark.div {...api.value.trackProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
