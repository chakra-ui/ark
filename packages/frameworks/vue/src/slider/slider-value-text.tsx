import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderValueTextProps = HTMLArkProps<'div'>

export const SliderValueText: ComponentWithProps<SliderValueTextProps> = defineComponent({
  name: 'SliderValueText',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.valueTextProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
