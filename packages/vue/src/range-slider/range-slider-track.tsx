import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderTrackProps = HTMLArkProps<'div'>

export const RangeSliderTrack = defineComponent({
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
