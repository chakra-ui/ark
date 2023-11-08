import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderValueTextProps = HTMLArkProps<'span'>

export const SliderValueText = defineComponent({
  name: 'SliderValueText',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.span {...api.value.valueTextProps} {...attrs}>
        {slots.default?.() || api.value.value.join(', ')}
      </ark.span>
    )
  },
})
