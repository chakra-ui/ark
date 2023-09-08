import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderMarkerProps = Assign<HTMLArkProps<'span'>, { value: number }>

export const SliderMarker = defineComponent({
  name: 'SliderMarker',
  props: {
    value: {
      type: Number as PropType<SliderMarkerProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.span {...api.value.getMarkerProps({ value: props.value })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.span>
    )
  },
})
