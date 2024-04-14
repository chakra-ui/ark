import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderLabelProps extends HTMLArkProps<'label'> {}

export const SliderLabel = defineComponent<SliderLabelProps>(
  (_, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'SliderLabel',
  },
)
