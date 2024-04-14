import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useSliderContext } from './slider-context'

export interface SliderMarkerGroupProps extends HTMLArkProps<'div'> {}

export const SliderMarkerGroup = defineComponent<SliderMarkerGroupProps>(
  (_, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.markerGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SliderMarkerGroup',
  },
)
