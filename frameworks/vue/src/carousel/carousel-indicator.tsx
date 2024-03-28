import type { IndicatorProps } from '@zag-js/carousel'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export interface CarouselIndicatorProps extends Assign<HTMLArkProps<'button'>, IndicatorProps> {}

export const CarouselIndicator = defineComponent<CarouselIndicatorProps>(
  (props, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.getIndicatorProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'CarouselIndicator',
    props: {
      index: {
        type: Number as PropType<CarouselIndicatorProps['index']>,
        required: true,
      },
      readOnly: {
        type: Boolean as PropType<CarouselIndicatorProps['readOnly']>,
        default: false,
      },
    },
  },
)
