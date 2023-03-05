import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderControlProps = HTMLArkProps<'div'>

export const SliderControl: ComponentWithProps<SliderControlProps> = defineComponent({
  name: 'SliderControl',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
