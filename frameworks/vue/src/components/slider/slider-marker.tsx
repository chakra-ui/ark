import type { MarkerProps } from '@zag-js/slider'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderMarkerProps extends Assign<HTMLArkProps<'span'>, MarkerProps> {}

export const SliderMarker = defineComponent<SliderMarkerProps>(
  (props, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.span {...api.value.getMarkerProps({ value: props.value })} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'SliderMarker',
    props: {
      value: {
        type: Number as PropType<MarkerProps['value']>,
        required: true,
      },
    },
  },
)
