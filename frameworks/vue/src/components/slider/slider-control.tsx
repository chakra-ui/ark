import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useSliderContext } from './slider-context'

export interface SliderControlProps extends HTMLArkProps<'div'> {}

export const SliderControl = defineComponent<SliderControlProps>(
  (_, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SliderControl',
  },
)
