import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useSliderContext } from './slider-context'

export interface SliderValueTextProps extends HTMLArkProps<'span'> {}

export const SliderValueText = defineComponent<SliderValueTextProps>(
  (_, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.span {...api.value.valueTextProps} {...attrs}>
        {slots.default?.() || api.value.value.join(', ')}
      </ark.span>
    )
  },
  {
    name: 'SliderValueText',
  },
)
