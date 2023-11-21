import type { MarkerProps } from '@zag-js/slider'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useSliderContext } from './slider-context'

export type SliderMarkerProps = Assign<HTMLArkProps<'span'>, MarkerProps>

export const SliderMarker = defineComponent({
  name: 'SliderMarker',
  props: {
    value: {
      type: Number as PropType<MarkerProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.span {...api.value.getMarkerProps({ value: props.value })} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})
