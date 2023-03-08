import { defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderMarkerProps = HTMLArkProps<'span'> & { value: number }

export const RangeSliderMarker: ComponentWithProps<RangeSliderMarkerProps> = defineComponent({
  name: 'RangeSliderMarker',
  props: {
    value: {
      type: Number as PropType<RangeSliderMarkerProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useRangeSliderContext()

    return () => (
      <ark.span {...api.value.getMarkerProps({ value: props.value })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.span>
    )
  },
})
