import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerGroupProps = HTMLArkProps<'div'>

export const RangeSliderMarkerGroup: ComponentWithProps<RangeSliderMarkerGroupProps> =
  defineComponent({
    name: 'RangeSliderMarkerGroup',
    setup(_, { slots, attrs }) {
      const api = useRangeSliderContext()

      return () => (
        <ark.div {...api.value.markerGroupProps} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      )
    },
  })
