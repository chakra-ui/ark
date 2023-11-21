import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl = defineComponent({
  name: 'SliderControl',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
