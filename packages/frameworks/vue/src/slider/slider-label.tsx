import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderLabelProps = HTMLArkProps<'label'>

export const SliderLabel = defineComponent({
  name: 'SliderLabel',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})
